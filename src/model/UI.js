import { observable } from 'mobx';

export class UI {
  @observable isSearchEnabled = true;
  @observable isTagsEnabled = true;

  @observable isGlobalSearch = false;
}