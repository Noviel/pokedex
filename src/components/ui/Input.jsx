import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

const Input = props => {
  const {
    inputProps = {},
    label,
    onChange,
    disabled,
    prependIcon,
    placeholder,
    value,
  } = props;
  console.log(props);
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {prependIcon && (
        <IconButton className={classes.iconButton} aria-label={label}>
          {prependIcon}
        </IconButton>
      )}
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        onChange={onChange}
        disabled={disabled}
        value={value}
        {...inputProps}
      />
    </Paper>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  prependIcon: PropTypes.node,
  appendIcon: PropTypes.node,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputProps: PropTypes.object,
  value: PropTypes.any
};

Input.defaultProps = {
  inputProps: {},
};

export { Input };
