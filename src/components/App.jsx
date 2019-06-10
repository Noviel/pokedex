import React from 'react';
import { Observer } from 'mobx-react-lite';

import { useStore } from './StoreContext';

const App = props => {
  const store = useStore();
  console.log('store', store);
  const observer = (
    <Observer>{() => <div>{JSON.stringify(store)}</div>}</Observer>
  );

  return (
    <div>
      <button onClick={() => store.fetchPokemons()}>load</button>
      <input type="text"></input>
      <button onClick={() => store.addPokemon('gigi')}>+</button>
      <div>{JSON.stringify(store)}</div>
      {observer}
    </div>
  );
};

export { App };
