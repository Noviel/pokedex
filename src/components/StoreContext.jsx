import React from 'react';
import PropTypes from 'prop-types';
import { useLocalStore } from 'mobx-react-lite';

import { createStore } from '../model/store';

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(createStore);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error(
      `Store is '${store}'. Ensure that current component is inside of StoreProvider.`
    );
  }
  return store;
};
