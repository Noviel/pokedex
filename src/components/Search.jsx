import React from 'react';
import { Observer } from 'mobx-react-lite';

import { Filter } from './SearchToggler';

import { useStore } from './StoreContext';

import { Search as SearchUI } from './ui/Search';

const Search = () => {
  const store = useStore();
  return (
    <Observer>
      {() => (
        <>
          <SearchUI
            onChange={e => {
              store.search = e.target.value;
            }}
            disabled={!store.isSearchActive}
          />
          <Filter />
        </>
      )}
    </Observer>
  );
};

Search.propTypes = {};

export { Search };
