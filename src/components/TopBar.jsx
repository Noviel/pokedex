import React from 'react';

import { FilterModeToggler } from './Filters/FilterModeToggler';
import { Search } from './Filters/Search/Search';
import { Tags} from './Filters/Tags/Tags';

const TopBar = () => {
  return (
    <div>
      <FilterModeToggler />
      <Search />
      <Tags />
    </div>
  );
};

export { TopBar };
