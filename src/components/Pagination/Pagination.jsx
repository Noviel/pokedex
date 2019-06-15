import React from 'react';
import { Observer } from 'mobx-react-lite';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

import { SelectPageSize } from './SelectPageSize';

import { useStore } from '../StoreContext';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

const Pagination = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const store = useStore();
  return (
    <Observer>
      {() => (
        <>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={store.prevPage}
          >
            <ArrowLeft />
          </Button>
          {store.pagination.page + 1}
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={store.nextPage}
          >
            <ArrowRight />
          </Button>
          <SelectPageSize />
        </>
      )}
    </Observer>
  );
};

export { Pagination };
