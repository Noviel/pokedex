import React from 'react';
import { Observer } from 'mobx-react-lite';

import Switch from '@material-ui/core/Switch';

import { useStore } from '../../StoreContext';

const SearchToggler = () => {
  const store = useStore();

  return (
    <Observer>
      {() => (
        <Switch
          checked={store.isSearchActive}
          onChange={store.toggleSearch}
          value="search"
          color="primary"
        />
      )}
    </Observer>
  );
};

export { SearchToggler };
