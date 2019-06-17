import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { PokemonsList } from './List/PokemonsList';
import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(2, 2, 0),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Container fixed maxWidth="lg">
      <CssBaseline />
      <Typography className={classes.header} component="h1" variant="h6" gutterBottom>
        Pokedex
      </Typography>
      <TopBar />
      <PokemonsList />
      <BottomBar />
    </Container>
  );
};

export { App };
