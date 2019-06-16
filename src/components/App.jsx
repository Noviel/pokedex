import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { PokemonsList } from './PokemonsList';
import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Container fixed maxWidth="lg">
      <CssBaseline />
      <Typography className={classes.text} variant="h2" gutterBottom>
        Pokedex
      </Typography>
      <TopBar />
      <PokemonsList />
      <BottomBar />
    </Container>
  );
};

export { App };
