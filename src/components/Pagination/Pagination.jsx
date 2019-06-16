import React from 'react';
import { Observer } from 'mobx-react-lite';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import Typography from '@material-ui/core/Typography';

import { SelectPageSize } from './SelectPageSize';

import { useStore } from '../StoreContext';

const useStyles = makeStyles(theme => ({
  item: {
    marginRight: theme.spacing(1),
  },
}));

const Pagination = () => {
  const classes = useStyles();

  const store = useStore();
  return (
    <Observer>
      {() => (
        <>
          <Typography className={classes.item}>
            Current page: {store.pagination.page + 1}
          </Typography>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="Split button"
            className={classes.item}
          >
            <Button
              color="primary"
              variant="contained"
              size="medium"
              onClick={store.prevPage}
            >
              <ArrowLeft />
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="medium"
              onClick={store.nextPage}
            >
              <ArrowRight />
            </Button>
          </ButtonGroup>

          <SelectPageSize />
        </>
      )}
    </Observer>
  );
};

export { Pagination };
