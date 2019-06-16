import React from 'react';
import { Observer } from 'mobx-react-lite';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';

import { Switch } from '../ui/Switch';

import { useStore } from '../StoreContext';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
}));

const FilterModeToggler = () => {
  const classes = useStyles();
  const store = useStore();

  return (
    <Observer>
      {() => (
        <div className={classes.root}>
          <Switch
            checked={store.isGlobalSearch}
            onChange={store.toggleSearchMode}
          />
          <Typography>
            Global search
            <Tooltip title="Search the entire database. It takes some time to preload indices.">
              <InfoIcon />
            </Tooltip>
          </Typography>
        </div>
      )}
    </Observer>
  );
};

export { FilterModeToggler };
