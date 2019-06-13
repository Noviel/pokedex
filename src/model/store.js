import { action, reaction, observable, computed } from 'mobx';
import { computedFn } from 'mobx-utils';

import {
  getPokemonsList,
  getAllPokemonsNamesAndIds,
  getPokemonByName,
} from '../api';

const defaultPageSizes = [10, 20, 50];

class Pagination {
  sizes = defaultPageSizes;
  @observable page = 0;
  @observable size = 10;

  constructor({ parent, sizes } = {}) {
    if (sizes) {
      this.sizes = sizes;
    }

    reaction(
      () => this.size,
      size => {
        /*
          Calculate new page index based on previous pagination state
        */
        const offset = this.page * this.size;
        this.size = size;
        this.page = offset / size;

        console.log(
          'calculated new page index ',
          this.page,
          'for size',
          this.size
        );
      }
    );
  }
}

const MINIMAL_SEARCH_LENGTH = 2;

class Pokedex {
  @observable allPokemons = [];
  @observable pokemonsByName = {};

  @observable search = '';
  @observable isSearchActive = true;

  @observable tags = ['poison'];
  @observable isTagsActive = true;

  pagination = new Pagination({ parent: this });
  paginationWithFilters = new Pagination({ parent: this });

  /*
    Names of pokemons to display
  */
  @observable
  visiblePokemons = [];

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      window.pokemons = this.pokemons;
      window.pokemonsByName = this.pokemonsByName;
      window.pagination = this.pagination;

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

    reaction(
      () => [this.searchedPokemons, this.isSearchActive],
      ([pokemons, isSearchActive]) => {
        if (isSearchActive) {
          const promisedPokemons = pokemons.map(this.getOrLoadPokemon);

          Promise.all(promisedPokemons).then(_ => {
            this.visiblePokemons = pokemons.map(pokemon => ({
              name: pokemon,
              status: 'closed',
            }));
            this.pagination.page = 0;
          });
        } else {
          console.log('search is deactivated');
        }
      }
    );

    reaction(
      () => this.pagination.page,
      page => {
        this.fetchPokemonsForPage(page);
      }
    );
  }

  addPokemon(name) {
    this.pokemons.push({
      name,
    });
  }

  getOrLoadPokemon = async name => {
    if (this.pokemonsByName[name]) {
      return this.pokemonsByName[name];
    }
    const pokemon = await getPokemonByName(name);
    this.pokemonsByName[pokemon.name] = pokemon;
    return pokemon;
  };

  @computed
  get searchedPokemons() {
    if (this.search === '' || this.search.length < MINIMAL_SEARCH_LENGTH) {
      return [];
    }
    const result = this.allPokemons
      .filter(({ name }) => name.includes(this.search))
      .map(({ name }) => name);

    return result;
  }

  @computed
  get searchStatus() {
    if (this.search.length < MINIMAL_SEARCH_LENGTH) {
      return `You need to enter atleast ${MINIMAL_SEARCH_LENGTH} symbols`;
    }
    return '';
  }

  @computed
  get pokemonsNotFound() {
    return (
      this.search.length >= MINIMAL_SEARCH_LENGTH &&
      this.searchedPokemons.length === 0
    );
  }

  getPokemon = name => {
    return this.pokemonsByName[name];
  };

  @action
  updateVisiblePokemons(names) {
    this.visiblePokemons = names.map(name => ({
      name,
      status: 'closed',
    }));
  }

  async fetchAllPokemonsNamesAndIds() {
    const pokemons = await getAllPokemonsNamesAndIds();
    this.allPokemons = pokemons;
  }

  async fetchPokemonsForPage(page) {
    const pokemons = await getPokemonsList({
      page,
      size: this.pagination.size,
    });

    pokemons.forEach(pokemon => {
      this.pokemonsByName[pokemon.name] = pokemon;
    });

    this.updateVisiblePokemons(pokemons.map(({ name }) => name));
  }

  @action
  toggleSearch = () => {
    this.isSearchActive = !this.isSearchActive;
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
    this.pagination.size = this.pagination.sizes[sizeIndex];
  };

  @action
  nextPage() {
    this.pagination.page++;
  }

  @action
  prevPage() {
    if (this.pagination.page !== 0) {
      this.pagination.page--;
    }
  }
}

export const createStore = () => {
  const store = new Pokedex();

  return store;
};
