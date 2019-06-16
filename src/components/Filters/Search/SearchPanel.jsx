import React from 'react';
import { Observer } from 'mobx-react-lite';

import SearchIcon from '@material-ui/icons/Search';

import { useStore } from '../../StoreContext';

import { Input } from '../../ui/Input';

const SearchPanel = () => {
  const store = useStore();
  return (
    <Observer>
      {() => (
        <>
          <Input
            placeholder="Search Pokemon by name"
            label="Search"
            prependIcon={<SearchIcon />}
            onChange={e => {
              store.search = e.target.value.toLowerCase();
            }}
            disabled={!store.isSearchActive}
          />
        </>
      )}
    </Observer>
  );
};

SearchPanel.propTypes = {};

export { SearchPanel };
