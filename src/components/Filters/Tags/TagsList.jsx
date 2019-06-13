import React from 'react';
import { Observer } from 'mobx-react-lite';

import { useStore } from '../../StoreContext';

import { Tag } from '../../ui/Tag';

const TagsList = () => {
  const store = useStore();
  return (
    <Observer>
      {() => (
        <div>
          Tags:
          {store.tags.map(tag => (
            <Tag key={tag} label={tag} onDelete={store.removeTag}></Tag>
          ))}
        </div>
      )}
    </Observer>
  );
};

TagsList.propTypes = {};

export { TagsList };
