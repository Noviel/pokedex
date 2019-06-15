import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Typography from '@material-ui/core/Typography';

import { PokemonStats } from './PokemonStats';
import { PokemonTags } from './PokemonTags';
import { PokemonAvatar } from './PokemonAvatar';

import { useStore } from './StoreContext';

const PokemonInfo = observer(({ name }) => {
  const store = useStore();
  const pokemon = store.getPokemon(name);
  if (!pokemon) {
    return <div />;
  }
  return (
    <Card>
      <CardHeader
        title={pokemon.name}
        titleTypographyProps={{ align: 'center' }}
      />
      <CardContent>
        <div>
          <PokemonAvatar name={name} />
          <PokemonTags name={name} />
          <PokemonStats name={name} />
        </div>
      </CardContent>
    </Card>
  );
});

PokemonInfo.propTypes = {
  name: PropTypes.string,
};

export { PokemonInfo };
