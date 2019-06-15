import React from 'react';
import PropTypes from 'prop-types';

import { default as SwitchMUI } from '@material-ui/core/Switch';

const Switch = ({ checked, onChange }) => {
  return (
    <SwitchMUI
      checked={checked}
      onChange={onChange}
      value="search"
      color="primary"
    />
  );
};

Switch.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export { Switch };
