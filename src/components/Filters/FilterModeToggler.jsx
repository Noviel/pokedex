import React from 'react';
import { Observer } from 'mobx-react-lite';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';

import { Switch } from '../ui/Switch';

import { useStore } from '../StoreContext';

const FilterModeToggler = () => {
  const store = useStore();
  return (
    <Observer>
      {() => (
        <>
          <Typography>
            Global search{' '}
            <Tooltip title="Search the entire database. It takes some time to preload indices.">
              <InfoIcon />
            </Tooltip>
          </Typography>
          <Switch
            checked={store.isGlobalSearch}
            onChange={store.toggleSearchMode}
          />
        </>
      )}
    </Observer>
  );
};

export { FilterModeToggler };
