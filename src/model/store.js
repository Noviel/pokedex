import { observable } from 'mobx';

class Pokedex {
  @observable pokemons = [];

  addPokemon(name) {
    this.pokemons.push({
      name,
    });
  }
}

export const createStore = () => {
  return new Pokedex();
};
