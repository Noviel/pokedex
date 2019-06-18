import uniq from 'lodash.uniq';
import { action, reaction, observable, computed } from 'mobx';
import { computedFn } from 'mobx-utils';

import { StringFilter, ArrayFilter } from './Filter';
import { Filters } from './Filters';

import { Pagination } from './Pagination';

import {
  getPokemonsList,
  getAllPokemonsNamesAndIds,
  getPokemonByName,
  getStats,
  getTypes,
} from '../api';

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

  @observable filters = new Filters([
    {
      type: 'string',
      ctx: {
        list: () => {
          return this.isGlobalSearch
            ? this.allPokemons
            : Object.keys(this.pokemonsByName).map(name => ({ name }));
        },
        test: item => item.name,
        output: item => item.name,
      },
    },
    {
      type: 'array',
      ctx: {
        list: () => {},
        filter: () => {
          const data = this.isGlobalSearch ? this.allTags : this.pokemonsByName;

          const searchList = this.tags;

          const list = Object.keys(data);

          return this.isGlobalSearch
            ? list
                .filter(tag => searchList.includes(tag))
                .flatMap(tag => data[tag].pokemon)
                .filter(uniq)
                .map(({ pokemon: { name } }) => name)
            : list.filter(name =>
                data[name].types.some(({ name }) => searchList.includes(name))
              );
        },
      },
    },
  ]);

  @computed
  get pokemonsByNameList() {
    return Object.keys(this.pokemonsByName);
  }

  pagination = new Pagination({ parent: this });

  /*
    Names of pokemons to display
  */
  @computed
  get visiblePokemons() {
    return this.isFiltered
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

    getTypes().then(typesMap => {
      this.allTags = typesMap;
    });

    reaction(
      () => [this.filteredPokemons],
      ([pokemons]) => {
        if (this.isFiltered) {
          const promisedPokemons = pokemons.map(this.getOrLoadPokemon);

          Promise.all(promisedPokemons).then(_ => {
            this.pagination.page = 0;
          });
        }
      }
    );

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
        if (!this.isFiltered) {
          this.fetchPokemonsForPage(page);
        }
      }
    );

    reaction(
      () => [this.pagination.size],
      ([size]) => {
        if (!this.isFiltered) {
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
  };

  @action
  setPokemonData = pokemon => {
    this.pokemonsByName[pokemon.name] = pokemon;
  };

  @action
  setPokemonsData = pokemons => {
    pokemons.forEach(pokemon => {
      this.pokemonsByName[pokemon.name] = pokemon;
    });
  };

  getOrLoadPokemon = async name => {
    if (this.pokemonsByName[name]) {
      return this.pokemonsByName[name];
    }
    const pokemon = await getPokemonByName(name);
    this.setPokemonData(pokemon);

    return pokemon;
  };

  @computed
  get filterSearch() {
    return this.filters[0].filtered;
  }

  @computed
  get filterTags() {
    return this.filters[1].filtered;
  }

  @computed
  get filteredPokemons() {
    if (!this.isFiltered) {
      return this.pokemonsCurrentPage;
    }

    const search = this.filterSearch;
    const tags = this.filterTags;

    const next = this.isSearchActive ? search : this.pokemonsCurrentPage;

    return this.isTagsActive
      ? next.filter(pokemon => tags.includes(pokemon))
      : search;
  }

  @computed
  get isFiltered() {
    return this.tags.length || this.search.length >= MINIMAL_SEARCH_LENGTH;
  }

  @computed
  get pokemonsNotFound() {
    return this.isFiltered && this.filteredPokemons.length === 0;
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
    if (this.isGlobalSearchReady) {
      this.isGlobalSearch = !this.isGlobalSearch;
    }
  };

  @computed
  get isGlobalSearchReady() {
    // Global search is ready if types with belonging pokemons and list of all pokemons are fetched
    return Object.keys(this.allTags).length && this.allPokemons.length;
  }
}

export const createStore = () => {
  const store = new Pokedex();

  return store;
};
