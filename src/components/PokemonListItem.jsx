import React from 'react';
import PropTypes from 'prop-types';

import { PokemonDetails } from './PokemonDetails';
import { PokemonInfo } from './PokemonInfo';

const PokemonListItem = ({ isOpen, name }) => {
  const component = isOpen ? (
    <PokemonDetails name={name} />
  ) : (
    <PokemonInfo name={name} />
  );
  return component;
};

PokemonListItem.propTypes = {
  isOpen: PropTypes.bool,
  name: PropTypes.string,
};

export { PokemonListItem };
