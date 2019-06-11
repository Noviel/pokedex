import React from 'react';
import PropTypes from 'prop-types';

const PokemonCard = props => {
  return (
    <div>
      {props.sprites && <img src={props.sprites.front_default}></img>}
      {props.name}
    </div>
  );
};

PokemonCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  sprites: PropTypes.shape({
    front_default: PropTypes.string,
  }),
};

export { PokemonCard };
