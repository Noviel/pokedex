import { observable, computed } from 'mobx';

export class Filter {
  @observable isEmpty = true;

  @observable query;

  type = 'string';

  constructor(type, ctx) {
    this.type = type;
    this.list = ctx.list;
    this.test = ctx.test;
    this.output = ctx.output;
  }
}

export class StringFilter extends Filter {
  minLength = 4;
  query = '';

  constructor(ctx, { minLength }) {
    super('string', ctx);
    this.minLength = minLength || this.minLength;
  }

  @computed
  get isActive() {
    return this.query.length >= this.minLength;
  }

  @computed
  get filtered() {
    if (!this.isActive) {
      return [];
    }

    return this.list()
      .filter(i => this.test(i).includes(this.query))
      .map(i => this.output(i));
  }
}

export class ArrayFilter extends Filter {
  @observable query = [];
  constructor(options) {
    super('array', options);
  }

  @computed
  get isActive() {
    return this.query.length;
  }

  @computed
  get filtered() {
    if (!this.isActive) {
      return [];
    }

    return this.list()
      .filter(i => this.test(i).includes(this.query))
      .map(i => this.output(i));
  }
}
