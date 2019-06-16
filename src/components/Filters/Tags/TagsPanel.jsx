import React from 'react';

import { TagsList } from './TagsList';
import { AddTag } from './AddTag';

const TagsPanel = () => {
  return (
    <>
      <TagsList />
      <AddTag />
    </>
  );
};

export { TagsPanel };
