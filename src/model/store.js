import { observable } from 'mobx';

import { getPokemonsList } from '../api';

class Pokedex {
  @observable pokemons = [];

  addPokemon(name) {
    this.pokemons.push({
      name,
    });
  }

  async fetchPokemons() {
    this.pokemons.push(await getPokemonsList({ limit: 10, offset: 2 }));
  }
}

export const createStore = () => {
  return new Pokedex();
};
