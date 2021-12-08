import { Child, PreviewFile } from 'beans';

class Dir extends Child {
  constructor(children, key, parent) {
    super(key, parent);
    if (Array.isArray(children)) {
      this.children = children.map(({ key, ...content }) => {
        return new PreviewFile(content, key, this);
      });
    } else {
      this.children = Object.keys(children).map(key => {
        const child = children[key];
        child.key = key;
        child.parent = this;
        return child;
      });
    }
  }

  getChild(...pathKeys) {
    let dir = this;
    for (const dirKey of pathKeys) {
      if (!(dir instanceof Dir)) return undefined;
      dir = dir.children.find(c => c.key === dirKey);
    }
    return dir;
  };

  get iconProps() {
    return { iconKey: 'finder' };
  }
}

export default Dir;
