import React from 'react';
import { Observer } from 'mobx-react-lite';

import { Switch } from '../../ui/Switch';

import { useStore } from '../../StoreContext';

const FilterModeToggler = () => {
  const store = useStore();
  return (
    <Observer>
      {() => (
        <Switch checked={store.isGlobalTags} onChange={store.toggleTagsMode} />
      )}
    </Observer>
  );
};

export { FilterModeToggler };
