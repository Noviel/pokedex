import React from 'react';

import { Search } from './Search';
import { Tags } from './ui/Tags';

const TopBar = () => {
  return (
    <div>
      <Search />
      <Tags />
    </div>
  );
};

export { TopBar };
