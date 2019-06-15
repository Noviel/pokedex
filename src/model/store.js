import { action, reaction, observable, computed } from 'mobx';
import { computedFn } from 'mobx-utils';

import {
  getPokemonsList,
  getAllPokemonsNamesAndIds,
  getPokemonByName,
  getStats,
  getTypes,
} from '../api';

const defaultPageSizes = [2, 5, 10, 20, 50];

class Pagination {
  sizes = defaultPageSizes;

  @observable page = 0;

  @computed
  get size() {
    return this.sizes[this.sizeIndex];
  }

  @computed
  get offset() {
    return this.page * this.size;
  }

  @observable sizeIndex = 0;

  constructor({ parent, sizes } = {}) {
    if (sizes) {
      this.sizes = sizes;
    }

    this.sizeIndex = Math.floor(this.sizes.length / 2);
    this.prevSize = -1;

    reaction(
      () => this.size,
      size => {
        /*
          Calculate new page index based on previous pagination state to display the same
          first Pokemon
        */
        const offset = this.page * this.prevSize;
        this.page = Math.floor(offset / this.size);
      }
    );
  }
}

const MINIMAL_SEARCH_LENGTH = 2;

class Pokedex {
  /*
    List of all pokemons names and ids
  */
  @observable allPokemons = [];

  /*
    Lists of all pokemons tags and stats
  */
  @observable allStats = [];
  @observable allTags = [];

  /*
    All pokemons data mapped by pokemon's name
  */
  @observable pokemonsByName = {};

  @computed
  get pokemonsByNameList() {
    return Object.keys(this.pokemonsByName);
  }

  @observable search = '';
  @observable isSearchActive = true;
  @observable isGlobalSearch = true;

  @observable tags = [];
  @observable isTagsActive = true;
  @observable isGlobalTags = false;
  /*
    True if pokemons are filtered by either tags or search
  */
  @observable isFiltered = false;

  pagination = new Pagination({ parent: this });
  paginationWithFilters = new Pagination({ parent: this });

  /*
    Names of pokemons to display
  */
  @computed
  get visiblePokemons() {
    const isFiltered = this.search.length || this.tags.length;
    return isFiltered
      ? this.filteredPokemons.slice(
          this.pagination.offset,
          this.pagination.offset + this.pagination.size
        )
      : this.filteredPokemons;
  }

  @observable
  pokemonsCurrentPage = [];

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      window.pokemons = this.pokemons;
      window.pokemonsByName = this.pokemonsByName;
      window.pagination = this.pagination;
      window.store = this;

      reaction(
        () => this.allPokemons,
        pokemons => {
          console.log(`Got all pokemons metadata`);
          console.log(pokemons);
        }
      );
    }

    this.startApp();
  }

  startApp() {
    this.fetchAllPokemonsNamesAndIds();
    this.fetchPokemonsForPage(0);
    getStats().then(stats => console.log(stats));
    getTypes().then(stats => console.log(stats));

    reaction(
      () => [this.filteredPokemons],
      ([pokemons]) => {
        if (this.tags.length || this.search.length) {
          const promisedPokemons = pokemons.map(this.getOrLoadPokemon);

          Promise.all(promisedPokemons).then(_ => {
            this.pagination.page = 0;
          });
        }
      }
    );

    reaction(() => this.pokemonsCurrentPage, pokemons => console.log(pokemons));

    reaction(
      () => [this.search, this.tags],
      ([search, tags]) => {
        /*
          If application switched to display pages without any filters
        */
        if (!search.length && !tags.length) {
          this.pagination.page = 0;
          this.fetchPokemonsForPage(0);
        }
      }
    );

    reaction(
      () => [this.pagination.page],
      ([page]) => {
        if (this.tags.length || this.search.length) {
          // this.visiblePokemons = this.filteredPokemons.slice(
          //   page * this.pagination.size,
          //   (1 + page) * this.pagination.size
          // );
        } else {
          this.fetchPokemonsForPage(page);
        }
      }
    );

    reaction(
      () => [this.pagination.size],
      ([size]) => {
        if (!this.tags.length && !this.search.length) {
          if (this.pagination.prevSize < size) {
            this.fetchPokemonsForPage(this.pagination.page);
          } else if (this.pagination.prevSize > size) {
            this.pokemonsCurrentPage.splice(size);
          }
        }
      }
    );
  }

  @action
  addPokemon = name => {
    this.pokemons.push({
      name,
    });
  };

  @action
  setAllPokemons = pokemons => {
    this.allPokemons = pokemons;
  }

  @action
  setPokemonData = pokemon => {
    this.pokemonsByName[pokemon.name] = pokemon;
  }

  @action
  setPokemonsData = pokemons => {
    pokemons.forEach(pokemon => {
      this.pokemonsByName[pokemon.name] = pokemon;
    });
  }

  getOrLoadPokemon = async name => {
    if (this.pokemonsByName[name]) {
      return this.pokemonsByName[name];
    }
    const pokemon = await getPokemonByName(name);
    this.setPokemonData(pokemon);

    return pokemon;
  };

  @computed
  get filteredPokemons() {
    let result = this.pokemonsCurrentPage;

    if (this.search.length >= MINIMAL_SEARCH_LENGTH) {
      const list = this.isGlobalSearch
        ? this.allPokemons
        : Object.keys(this.pokemonsByName).map(name => ({ name }));

      result = list
        .filter(({ name }) => name.includes(this.search))
        .map(({ name }) => name);
    }

    if (this.tags.length) {
      /* `result` can contain names of not fetched pokemons, skip them for now */
      const pokemonsWithAnyTag = this.pokemonsByNameList.filter(name =>
        this.pokemonsByName[name].types.some(({ name }) =>
          this.tags.includes(name)
        )
      );
      result = result.filter(name => pokemonsWithAnyTag.includes(name));
    }

    return result;
  }

  @computed
  get isFiltered() {
    return this.tags.length || this.search.length;
  }

  @computed
  get searchStatus() {
    if (this.search.length && this.search.length < MINIMAL_SEARCH_LENGTH) {
      return `You need to enter atleast ${MINIMAL_SEARCH_LENGTH} symbols`;
    }
    return '';
  }

  @computed
  get pokemonsNotFound() {
    return (
      this.tags.length ||
      (this.search.length && this.filteredPokemons.length === 0)
    );
  }

  getPokemon = name => {
    return this.pokemonsByName[name];
  };

  async fetchAllPokemonsNamesAndIds() {
    const pokemons = await getAllPokemonsNamesAndIds();
    this.setAllPokemons(pokemons);
  }

  async fetchPokemonsForPage(page) {
    const pokemons = await getPokemonsList({
      page,
      size: this.pagination.size,
    });

    this.setPokemonsData(pokemons);
    this.pokemonsCurrentPage = pokemons.map(({ name }) => name);

    window.scrollTo(0, 0);
  }

  @action
  setStats(stats) {
    this.stats = stats;
  }

  fetchStats = async () => {
    this.setStats(await getStats());
  };

  @action
  toggleSearchMode = () => {
    this.isGlobalSearch = !this.isGlobalSearch;
  };

  @action
  toggleTagsMode = () => {
    // Seems like there is no API to query pokemons by type tag
    // So for now toggling is disabled
  };

  @action
  addTag = tag => {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  };

  @action
  removeTag = tag => {
    this.tags = this.tags.filter(t => t !== tag);
  };

  isNewTag = computedFn(function isNewTag(tag) {
    return !this.tags.includes(tag);
  });

  @action
  setPageSize = sizeIndex => {
    this.pagination.prevSize = this.pagination.size;
    this.pagination.sizeIndex = sizeIndex;
  };

  @computed
  get isNextPageAvailable() {
    const isFiltered = this.search.length || this.tags.length;
    return isFiltered
      ? this.pagination.offset + this.pagination.size <
          this.filteredPokemons.length
      : this.visiblePokemons.length >= this.filteredPokemons.length;
  }

  @computed
  get isPrevPageAvailable() {
    return this.pagination.page !== 0;
  }

  @action
  nextPage = () => {
    if (this.isNextPageAvailable) {
      this.pagination.page++;
    }
  };

  @action
  prevPage = () => {
    if (this.isPrevPageAvailable) {
      this.pagination.page--;
    }
  };
}

export const createStore = () => {
  const store = new Pokedex();

  return store;
};
