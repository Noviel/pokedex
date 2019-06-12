import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Typography from '@material-ui/core/Typography';

const PokemonCard = props => {
  return (
    <div>
      <Card>
        <CardHeader
          title={props.name}
          titleTypographyProps={{ align: 'center' }}
        />
        <CardContent>
          <div>
            {props.sprites && <img src={props.sprites.front_default}></img>}
            <Typography variant="h6" color="textSecondary">
              {props.types.map(({ name }) => (
                <div key={name}>{name}</div>
              ))}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {props.stats.map(({ name, value }) => (
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

PokemonCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  sprites: PropTypes.shape({
    front_default: PropTypes.string,
  }),
  types: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
    })
  ),
};

export { PokemonCard };
