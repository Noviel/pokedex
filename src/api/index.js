import * as Pokedex from 'pokeapi-js-wrapper';

const PokeApi = new Pokedex.Pokedex();

const cache = {};

const endpoint = `https://pokeapi.co/api/v2/`;

const idFromUrlRegex = /\/\d+\/$/;

function getPokemonIdFromUrl(url) {
  return parseInt(idFromUrlRegex.exec(url)[0].replace('/', ''), 10);
}

/*
  "Cache" all pokemons names and ids to improve user's search experience.
  ~64KB of data first-time startup of the application.
*/
export async function getAllPokemonsNamesAndIds() {
  const data = await PokeApi.getPokemonsList();
  return data.results.map(({ name, url }) => {
    try {
      return { name, id: getPokemonIdFromUrl(url) };
    } catch (e) {
      throw new Error(
        `Something is wrong with API data format. Unable to get pokemon id from URL '${url}'.`
      );
    }
  });
}

const convertPokemonToFrontendModel = pokemon => ({
  name: pokemon.name,
  id: pokemon.id,
  sprites: pokemon.sprites,
  stats: pokemon.stats.map(({ base_stat, stat: { name } }) => ({
    value: base_stat,
    name,
  })),
  types: pokemon.types.map(({ type }) => ({ name: type.name })),
});

export async function getPokemonByName(name) {
  const pokemonData = await PokeApi.getPokemonByName(encodeURIComponent(name));

  return convertPokemonToFrontendModel(pokemonData);
}

/*
  Should return paginated list of pokemons with very basic data
*/
export async function getPokemonsList({ page, size }) {
  const list = await PokeApi.getPokemonsList({
    limit: size,
    offset: page * size,
  });

  const pokemonsRawData = await PokeApi.resource(
    list.results.map(poke => {
      return poke.url;
    })
  );

  const pokemons = pokemonsRawData.map(convertPokemonToFrontendModel);

  return pokemons;
}

export async function getStats() {
  const stats = await PokeApi.getStatsList();

  return stats;
}

export async function getTypes() {
  const types = await PokeApi.getTypesList();

  const typesDetails = await PokeApi.resource(
    types.results.map(({ url }) => url)
  );

  
  const typesMap = typesDetails.reduce((result, type) => {
    result[type.name] = type;
    return result;
  }, {});

  return typesMap;
}

export async function getPokemonsByType(type) {}
