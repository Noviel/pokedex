import { action, reaction, observable, computed } from 'mobx';

import {
  getPokemonsList,
  getAllPokemonsNamesAndIds,
  getPokemonByName,
} from '../api';

class Pagination {
  @observable page = 0;
  @observable size = 10;
}

class Pokedex {
  @observable pokemonsByName = {};

  @observable search = '';
  @observable tags = [];

  @observable allPokemons = [];

  @observable
  pagination = new Pagination();

  @observable
  visiblePokemons = [];

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      window.pokemons = this.pokemons;
      window.pokemonsByName = this.pokemonsByName;
      window.pagination = this.pagination;
    }

    this.startApp();
  }

  startApp() {
    this.fetchAllPokemonsNamesAndIds();
    this.fetchPokemonsCurrentPage();

    reaction(
      () => this.searchedPokemons,
      pokemons => {
        if (pokemons.length) {
          const promisedPokemons = pokemons.map(this.getOrLoadPokemon);

          Promise.all(promisedPokemons).then(_ => {
            this.visiblePokemons = pokemons;
          });
        }
      }
    );

    reaction(
      () => this.pagination.page,
      page => {
        this.fetchPokemonsCurrentPage();
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
    if (this.search === '' || this.search.length < 2) {
      return [];
    }
    const result = this.allPokemons
      .filter(({ name }) => name.includes(this.search))
      .map(({ name }) => name);

    return result;
  }

  @action
  nextPage() {
    this.pagination.page++;
  }

  updateVisiblePokemons() {}

  async fetchAllPokemonsNamesAndIds() {
    const pokemons = await getAllPokemonsNamesAndIds();
    this.allPokemons = pokemons;
  }

  async fetchPokemonsCurrentPage() {
    const pokemons = await getPokemonsList({
      page: this.pagination.page,
      size: this.pagination.size,
    });

    pokemons.forEach(pokemon => {
      this.pokemonsByName[pokemon.name] = pokemon;
    });

    this.visiblePokemons = pokemons.map(({ name }) => name);
  }
}

export const createStore = () => {
  const store = new Pokedex();

  if (process.env.NODE_ENV === 'development') {
    reaction(
      () => store.allPokemons,
      pokemons => {
        console.log(`Got all pokemons metadata`);
        console.log(pokemons);
      }
    );
  }

  return store;
};
