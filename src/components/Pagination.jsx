import React from 'react';

import { useStore } from './StoreContext';

const Pagination = () => {
  const store = useStore();

  return (
    <div>
      <button>Beginning</button>
      <button>Previous</button>
      <button>Current</button>
      <button
        onClick={() => {
          store.nextPage();
        }}
      >
        Next
      </button>
      <button>Last</button>
    </div>
  );
};

export { Pagination };
