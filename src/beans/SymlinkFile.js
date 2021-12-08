import { File } from 'beans';

class SymlinkFile extends File {
  constructor(target, key, parent) {
    super(key, parent);
    this.target = target;
  }

  get url() {
    return this.target.url;
  }

  get name() {
    return this.target.name;
  }

  get iconProps() {
    return this.target.iconProps;
  }
}

export default SymlinkFile;
