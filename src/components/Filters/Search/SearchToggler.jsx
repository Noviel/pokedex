import React from 'react';
import { Observer } from 'mobx-react-lite';

import { Switch } from '../../ui/Switch';

import { useStore } from '../../StoreContext';

const SearchToggler = () => {
  const store = useStore();

  return (
    <Observer>
      {() => (
        <>
          Full base search
          <Switch
            checked={store.isGlobalSearch}
            onChange={store.toggleSearchMode}
          />
        </>
      )}
    </Observer>
  );
};

export { SearchToggler };
