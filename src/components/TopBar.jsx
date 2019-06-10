import React from 'react';

import { useStore } from './StoreContext';

const TopBar = () => {
  const { fetchPokemons } = useStore();

  return (
    <div>
      <button onClick={() => fetchPokemons()}>load</button>
      <label>Search</label>
      <input type="text"></input>
    </div>
  );
};

export { TopBar };
