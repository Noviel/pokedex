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
            {store.pokemonsNotFound ? <div>NotFound</div> : ''}
            {store.searchStatus}
            {!!store.visiblePokemons.length &&
              store.visiblePokemons.map(({ name, status }) => (
                <PokemonListItem
                  key={name}
                  name={name}
                  isOpen={status === 'open'}
                />
              ))}
          </pre>
        </div>
      )}
    </Observer>
  );
};

export { PokemonsList };
