import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { FilterModeToggler } from './Filters/FilterModeToggler';
import { SearchPanel } from './Filters/Search/SearchPanel';
import { TagsPanel } from './Filters/Tags/TagsPanel';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const TopBar = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container fixed spacing={3}>
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
    </div>
  );
};

export { TopBar };
