import * as Pokedex from 'pokeapi-js-wrapper';

const PokeApi = new Pokedex.Pokedex();

const cache = {};

const endpoint = `https://pokeapi.co/api/v2/`;

/*
  Should return list of pokemons with very basic data
*/
export async function getPokemonsList({ page, limit }) {
  const list = await PokeApi.getPokemonsList({ limit, offset: page });

  const pokemonsRawData = await PokeApi.resource(
    list.results.map(poke => {
      return poke.url;
    })
  );

  const pokemons = pokemonsRawData.map(poke => ({
    name: poke.name,
    id: poke.id,
    sprites: poke.sprites,
    stats: poke.stats,
  }));

  return pokemons;
}
