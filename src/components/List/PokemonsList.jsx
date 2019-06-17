import React from 'react';
import { Observer } from 'mobx-react-lite';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { useStore } from '../StoreContext';

import { PokemonListItem } from './PokemonListItem';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(10),
  },
}));

const PokemonsList = () => {
  const store = useStore();
  const classes = useStyles();
  return (
    <Observer>
      {() => (
        <Grid container spacing={2} className={classes.root}>
          {store.visiblePokemons.length ? (
            store.visiblePokemons.map(name => (
              <Grid key={name} item xs={12} sm={6} md={4}>
                <PokemonListItem name={name} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" align="center">
                No Pokemon was found
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Observer>
  );
};

export { PokemonsList };
