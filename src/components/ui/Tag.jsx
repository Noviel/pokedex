import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Tag = ({ onDelete, label, icon }) => {
  const classes = useStyles();

  const handleDelete = onDelete
    ? () => {
        onDelete(label);
      }
    : undefined;

  return (
    <Chip
      icon={icon}
      label={label}
      onDelete={handleDelete}
      className={classes.chip}
    />
  );
};

Tag.propTypes = {
  onDelete: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.node,
};

export { Tag };
