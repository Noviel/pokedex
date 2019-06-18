import { observable, computed } from 'mobx';

import { Filter, StringFilter, ArrayFilter } from './Filter';

export class Filters {
  @observable
  filters = [];

  constructor(filters, options) {
    this.filters = filters.map(({ type, ctx }) => {
      switch (type) {
        case 'string':
          return new StringFilter(type, ctx);
        case 'array':
          return new ArrayFilter(type, ctx);
      }
    });
  }

  @computed
  get isFiltered() {
    return this.filters.some(filter => filter.isActive);
  }

  @computed
  get filtered() {
    if (!this.isFiltered) {
      return { result: [], active: false };
    }

    return this.filters.reduce((total, filter) => {
      if (filter.isActive) {
        total.result = filter.filtered.filter();
      }
      return total
    }, { result: [], active: true });
  }
}
