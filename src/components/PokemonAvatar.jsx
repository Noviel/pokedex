import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { useStore } from './StoreContext';

const PokemonAvatar = observer(({ name }) => {
  const store = useStore();
  const pokemon = store.getPokemon(name);

  return pokemon.sprites && <img src={pokemon.sprites.front_default}></img>;
});

PokemonAvatar.propTypes = {
  name: PropTypes.string,
};

export { PokemonAvatar };
