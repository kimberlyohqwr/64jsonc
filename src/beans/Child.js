import { isExternal, namize } from 'common/utils';
import { Dir, PreviewFile, RootDir } from 'beans';

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
      const child = RootDir.instance.getChild(...pathKeys);
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
    if (isExternal(this.url)) {
      window.open(this.url);
    } else {
      history.push(this.url);
    }
  }

  remove() {
    const index = this.parent.children.indexOf(this);
    this.parent.children.splice(index, 1);
  }
}

export default Child;
