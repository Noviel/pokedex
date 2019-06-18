import { observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

class Tags {
  
  @observable list = [];
  constructor(parent) {}

  @action
  addTag = tag => {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  };

  @action
  removeTag = tag => {
    this.tags = this.tags.filter(t => t !== tag);
  };

  isNewTag = computedFn(function isNewTag(tag) {
    return !this.tags.includes(tag);
  });
}
