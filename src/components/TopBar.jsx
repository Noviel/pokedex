import React from 'react';

import { Search } from './Filters/Search/Search';
import { Tags} from './Filters/Tags/Tags';

const TopBar = () => {
  return (
    <div>
      <Search />
      <Tags />
    </div>
  );
};

export { TopBar };
