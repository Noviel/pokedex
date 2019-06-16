import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { FilterModeToggler } from './Filters/FilterModeToggler';
import { SearchPanel } from './Filters/Search/SearchPanel';
import { TagsPanel } from './Filters/Tags/TagsPanel';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

const TopBar = () => {
  const classes = useStyles();
  return (
    <Grid container fixed spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <FilterModeToggler />
      </Grid>
      <Grid item xs={12} md={6}>
        <SearchPanel />
      </Grid>
      <Grid item xs={12} md={6}>
        <TagsPanel />
      </Grid>
    </Grid>
  );
};

export { TopBar };
