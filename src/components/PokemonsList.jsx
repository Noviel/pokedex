import React from 'react';
import { Observer } from 'mobx-react-lite';

import { useStore } from './StoreContext';

import { PokemonCard } from './PokemonCard';

const PokemonsList = () => {
  const store = useStore();
  return (
    <Observer>
      {() => (
        <div>
          <pre>
            Loaded pokemons:
            {!!store.pokemonsWithPagination.length &&
              store.pokemonsWithPagination.map(pokemon => (
                <PokemonCard key={pokemon.id} {...pokemon} />
              ))}
          </pre>
        </div>
      )}
    </Observer>
  );
};

export { PokemonsList }
