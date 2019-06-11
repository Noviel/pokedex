import React from 'react';
import { Observer } from 'mobx-react-lite';

import { useStore } from '../StoreContext';

const Search = () => {
  const store = useStore();
  return (
    <Observer>
      {() => (
        <>
          <label>Search</label>
          <input
            type="text"
            onChange={e => {
              store.search = e.target.value;
            }}
          ></input>
        </>
      )}
    </Observer>
  );
};

Search.propTypes = {};

export { Search };
