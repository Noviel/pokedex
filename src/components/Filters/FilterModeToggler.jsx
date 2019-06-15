import React from 'react';
import { Observer } from 'mobx-react-lite';

import { Switch } from '../ui/Switch';

import { useStore } from '../StoreContext';

const FilterModeToggler = () => {
  const store = useStore();
  return (
    <Observer>
      {() => (
        <>
          Global search
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
