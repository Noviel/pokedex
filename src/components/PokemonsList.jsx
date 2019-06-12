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
            {store.pokemonsNotFound ? <div>NotFound</div> : ''}
            {store.searchStatus}
            {!!store.visiblePokemons.length &&
              store.visiblePokemons.map(pokemon => (
                <PokemonCard key={pokemon} {...store.pokemonsByName[pokemon]} />
              ))}
          </pre>
        </div>
      )}
    </Observer>
  );
};

export { PokemonsList };
