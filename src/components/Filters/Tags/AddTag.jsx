import React, { useState } from 'react';
import { Observer } from 'mobx-react-lite';

import AddIcon from '@material-ui/icons/AddCircle';

import { useStore } from '../../StoreContext';

import { Input } from '../../ui/Input';

const AddTag = () => {
  const [tag, setTag] = useState('');
  const store = useStore();

  const handleAddClick = e => {
    store.addTag(tag.toLowerCase());
    setTag('');
  };

  return (
    <Observer>
      {() => (
        <Input
          value={tag}
          onChange={e => {
            setTag(e.target.value);
          }}
          onSubmit={handleAddClick}
          placeholder="Search Pokemon by tag"
          disabled={!store.isTagsActive}
          appendLabel="Add tag"
          onAppendClick={handleAddClick}
          appendIcon={<AddIcon />}
          appendDisabled={tag === '' || !store.isNewTag(tag)}
        />
      )}
    </Observer>
  );
};

AddTag.propTypes = {};

export { AddTag };
