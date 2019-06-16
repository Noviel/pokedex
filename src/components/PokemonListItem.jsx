import React from 'react';
import PropTypes from 'prop-types';

import { PokemonDetails } from './PokemonDetails';

const PokemonListItem = ({ isOpen, name }) => {
  const component = isOpen ? (
    <div>Not implemented yet</div>
  ) : (
    <PokemonDetails name={name} />
  );
  return component;
};

PokemonListItem.propTypes = {
  isOpen: PropTypes.bool,
  name: PropTypes.string,
};

export { PokemonListItem };
