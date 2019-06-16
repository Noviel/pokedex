import React from 'react';
import { Observer } from 'mobx-react-lite';

import Grid from '@material-ui/core/Grid';

import { useStore } from './StoreContext';

import { PokemonListItem } from './PokemonListItem';

const PokemonsList = () => {
  const store = useStore();
  return (
    <Observer>
      {() => (
        <div>
          {store.searchStatus}
          <Grid container spacing={2}>
            {store.visiblePokemons.length ? (
              store.visiblePokemons.map(name => (
                <Grid key={name} item xs={12} sm={6} md={4}>
                  <PokemonListItem name={name} />
                </Grid>
              ))
            ) : (
              <div>NotFound</div>
            )}
          </Grid>
        </div>
      )}
    </Observer>
  );
};

export { PokemonsList };
