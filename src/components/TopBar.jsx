import React from 'react';

import { Search } from './Filters/Search/Search';

import { TagsList } from './Filters/Tags/TagsList';
import { AddTag } from './Filters/Tags/AddTag';

const TopBar = () => {
  return (
    <div>
      <Search />
      <AddTag />
      <TagsList />
    </div>
  );
};

export { TopBar };
