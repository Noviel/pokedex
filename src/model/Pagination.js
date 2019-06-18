import { observable, computed, action, reaction } from 'mobx';

const defaultPageSizes = [2, 5, 10, 20, 50];

export class Pagination {
  sizes = defaultPageSizes;

  @observable sizeIndex = 0;
  @observable page = 0;

  constructor({ parent, sizes, filter } = {}) {
    if (sizes) {
      this.sizes = sizes;
    }

    this.sizeIndex = Math.floor(this.sizes.length / 2);
    this.prevSize = -1;

    reaction(
      () => this.size,
      size => {
        const offset = this.page * this.prevSize;
        this.page = Math.floor(offset / this.size);
      }
    );
  }

  @computed
  get size() {
    return this.sizes[this.sizeIndex];
  }

  @computed
  get offset() {
    return this.page * this.size;
  }

  @action
  setPageSize = sizeIndex => {
    this.pagination.prevSize = this.pagination.size;
    this.pagination.sizeIndex = sizeIndex;
  };

  @computed
  get isNextPageAvailable() {
    return this.filter.isActive
      ? this.offset + this.size <
          this.filteredPokemons.length
      : this.visiblePokemons.length >= this.filteredPokemons.length;
  }

  @computed
  get isPrevPageAvailable() {
    return this.pagination.page !== 0;
  }

  @action
  nextPage = () => {
    if (this.isNextPageAvailable) {
      this.pagination.page++;
    }
  };

  @action
  prevPage = () => {
    if (this.isPrevPageAvailable) {
      this.pagination.page--;
    }
  };
}
