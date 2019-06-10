import { observable, computed } from 'mobx';

import { getPokemonsList } from '../api';

class Pokedex {
  @observable pokemonsById = {};
  @observable pagination = {
    page: 0,
    size: 10,
  };

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      window.pokemons = this.pokemons;
      window.pokemonsById = this.pokemonsById;
      window.pagination = this.pagination;
    }
  }

  addPokemon(name) {
    this.pokemons.push({
      name,
    });
  }

  @computed
  get pokemonsWithPagination() {
    return Object.keys(this.pokemonsById).map(pokemonId => {
      return this.pokemonsById[pokemonId];
    });
  }

  async fetchPokemons() {
    const pokemons = await getPokemonsList({
      limit: this.pagination.size,
      offset: this.pagination.page,
    });
    pokemons.forEach(pokemon => {
      this.pokemonsById[pokemon.id] = pokemon;
    });
  }
}

export const createStore = () => {
  return new Pokedex();
};
