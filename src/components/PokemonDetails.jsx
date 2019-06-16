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

const PokemonDetails = observer(({ name }) => {
  const store = useStore();
  const pokemon = store.getPokemon(name);

  let body;
  if (pokemon) {
    body = (
      <>
        <PokemonAvatar name={name} />
        <PokemonTags name={name} />
        <PokemonStats name={name} />
      </>
    );
  } else {
    body = `Loading`;
  }

  return (
    <Card>
      <CardHeader title={name} titleTypographyProps={{ align: 'center' }} />
      <CardContent>{body}</CardContent>
    </Card>
  );
});

PokemonDetails.propTypes = {
  name: PropTypes.string,
};

export { PokemonDetails };
