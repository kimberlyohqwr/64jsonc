import { namize } from 'common/utils';
import { Dir, PreviewFile } from 'beans/index';
import { rootDir } from 'data';

class Child {
  constructor(key, parent) {
    this.key = key;
    this.parent = parent;
  }

  get pathKeys() {
    return [...this.parent.pathKeys, this.key];
  }

  get path() {
    return `/${this.pathKeys.join('/')}`;
  }

  get finderUrl() {
    const { pathKeys } = this;
    if (['users', 'jason', 'desktop'].every((v, i) => v === pathKeys[i]) && pathKeys.length > 3) {
      const child = rootDir.getChild(...pathKeys);
      if (child instanceof Dir || child instanceof PreviewFile) {
        return `/${pathKeys.slice(3).join('/')}`;
      }
    }
    return `/finder/${pathKeys.join('/')}`;
  }

  get url() {
    return this.finderUrl;
  }

  get name() {
    return namize(this.key);
  }

  get iconProps() {
    return null;
  }

  open(history) {
    if (this.url.startsWith('/')) {
      history.push(this.url);
    } else {
      window.open(this.url);
    }
  }

  remove() {
    const index = this.parent.children.indexOf(this);
    this.parent.children.splice(index, 1);
  }
}

export default Child;
