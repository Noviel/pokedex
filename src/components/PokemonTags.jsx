import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import Typography from '@material-ui/core/Typography';

import { useStore } from './StoreContext';

const getTagsMap = () => {

}

const PokemonTags = observer(({ name }) => {
  const store = useStore();
  const pokemon = store.getPokemon(name);

  return (
    <div>
      {pokemon.types.map(({ name }) => (
        <div key={name}>
          <Typography variant="h6" color="textSecondary">
            {name}{' '}
          </Typography>
        </div>
      ))}
    </div>
  );
});

PokemonTags.propTypes = {
  name: PropTypes.string,
};

export { PokemonTags };
