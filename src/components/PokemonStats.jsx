import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import Typography from '@material-ui/core/Typography';

import { useStore } from './StoreContext';

import { getStatTranslation } from '../model/Stats';

const Stat = ({ name, value }) => {
  const translation = getStatTranslation(name);

  return (
    <div>
      <Typography variant="h6" color="textSecondary">
        {translation}: {value}
      </Typography>
    </div>
  );
};

Stat.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
};

const PokemonStats = observer(({ name }) => {
  const store = useStore();
  const pokemon = store.getPokemon(name);

  return (
    <div>
      {pokemon.stats.map(({ name, value }) => (
        <div key={name}>
          <Stat name={name} value={value} />
        </div>
      ))}
    </div>
  );
});

PokemonStats.propTypes = {
  name: PropTypes.string,
};

export { PokemonStats };
