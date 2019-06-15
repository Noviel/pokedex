import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import Typography from '@material-ui/core/Typography';

import { useStore } from './StoreContext';

const PokemonStats = observer(({ name }) => {
  const store = useStore();
  const pokemon = store.getPokemon(name);

  console.log(store.stats);

  return (
    <div>
      {pokemon.stats.map(({ name, value }) => (
        <div key={name}>
        <Typography variant="h6" color="textSecondary">
          {name} {value}
          </Typography>
        </div>
      ))}
    </div>
  );
});

PokemonStats.propTypes = {
  name: PropTypes.string,
};

export { PokemonStats };
