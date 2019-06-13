import React, { useState, useMemo } from 'react';
import { Observer } from 'mobx-react-lite';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';

import { useStore } from '../../StoreContext';

import { Input } from '../../ui/Input';

const AddTag = () => {
  const [tag, setTag] = useState('');
  const store = useStore();

  const handleAddClick = e => {
    store.addTag(tag);
    setTag('');
  };

  return (
    <Observer>
      {() => (
        <>
          <Input
            value={tag}
            onChange={e => {
              setTag(e.target.value);
            }}
            disabled={!store.isTagsActive}
          />
          <Button
            disabled={tag === '' || !store.isNewTag(tag)}
            color="primary"
            variant="contained"
            size="small"
            onClick={handleAddClick}
          >
            <AddIcon />
          </Button>
        </>
      )}
    </Observer>
  );
};

AddTag.propTypes = {};

export { AddTag };
