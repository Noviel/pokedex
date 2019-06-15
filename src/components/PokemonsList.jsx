import React from 'react';
import { Observer } from 'mobx-react-lite';

import { useStore } from './StoreContext';

import { PokemonListItem } from './PokemonListItem';

const PokemonsList = () => {
  const store = useStore();
  return (
    <Observer>
      {() => (
        <div>
          <pre>
            {store.searchStatus}
            {store.visiblePokemons.length ? (
              store.visiblePokemons.map(name => (
                <PokemonListItem key={name} name={name} />
              ))
            ) : (
              <div>NotFound</div>
            )}
          </pre>
        </div>
      )}
    </Observer>
  );
};

export { PokemonsList };
