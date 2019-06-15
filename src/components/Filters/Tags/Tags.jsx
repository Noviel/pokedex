import React from 'react';

import { TagsList } from './TagsList';
import { AddTag } from './AddTag';
import { FilterModeToggler } from './FilterModeToggler';

const Tags = () => {
  return (
    <>
      <AddTag />
      <FilterModeToggler />
      <TagsList />
    </>
  );
};

export { Tags };
