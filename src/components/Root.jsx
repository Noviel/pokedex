import React from 'react';
import PropTypes from 'prop-types';

import { StoreProvider } from './StoreContext';
import { App } from './App';

const Root = ({ store }) => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

Root.propTypes = {
  store: PropTypes.object,
};

export { Root };
