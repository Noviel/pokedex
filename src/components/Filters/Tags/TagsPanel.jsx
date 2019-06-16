import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { TagsList } from './TagsList';
import { AddTag } from './AddTag';

const useStyles = makeStyles({
  divider: {
    marginBottom: 10,
  },
});

const TagsPanel = () => {
  const classes = useStyles();

  return (
    <>
      <AddTag />
      <div className={classes.divider} />
      <TagsList />
    </>
  );
};

export { TagsPanel };
