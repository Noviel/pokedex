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
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

const Input = props => {
  const {
    inputProps = {},
    label,
    appendLabel,
    onChange,
    disabled,
    prependIcon,
    appendIcon,
    placeholder,
    value,
    onAppendClick,
    appendDisabled,
  } = props;

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
      {appendIcon && (
        <IconButton
          className={classes.iconButton}
          aria-label={appendLabel}
          onClick={onAppendClick}
          disabled={appendDisabled}
        >
          {appendIcon}
        </IconButton>
      )}
    </Paper>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  onAppendClick: PropTypes.func,
  disabled: PropTypes.bool,
  prependIcon: PropTypes.node,
  appendIcon: PropTypes.node,
  appendLabel: PropTypes.string,
  appendDisabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputProps: PropTypes.object,
  value: PropTypes.any,
  append: PropTypes.object,
};

Input.defaultProps = {
  inputProps: {},
};

export { Input };
