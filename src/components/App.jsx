import React from 'react';

import { PokemonsList } from './PokemonsList';
import { Pagination } from './Pagination';
import { TopBar } from './TopBar';

const App = () => {
  return (
    <div>
      <TopBar />
      <PokemonsList />
      <Pagination />
    </div>
  );
};

export { App };
