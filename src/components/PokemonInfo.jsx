import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Typography from '@material-ui/core/Typography';

import { useStore } from './StoreContext';

const PokemonInfo = ({ name }) => {
  const store = useStore();
  const pokemon = store.getPokemon(name);
  if (!pokemon) {
    return <div>Where is pokemon {name}???</div>;
  }
  return (
    <div>
      <Card>
        <CardHeader
          title={pokemon.name}
          titleTypographyProps={{ align: 'center' }}
        />
        <CardContent>
          <div>
            {pokemon.sprites && <img src={pokemon.sprites.front_default}></img>}
            <Typography variant="h6" color="textSecondary">
              {pokemon.types.map(({ name }) => (
                <div key={name}>{name}</div>
              ))}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {pokemon.stats.map(({ name, value }) => (
                <div key={name}>
                  {name} {value}
                </div>
              ))}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

PokemonInfo.propTypes = {
  name: PropTypes.string,
};

export { PokemonInfo };
