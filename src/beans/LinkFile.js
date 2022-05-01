import { File } from 'beans';

class LinkFile extends File {
  constructor(href, key, parent) {
    super(key, parent);
    this.href = href;
  }

  get url() {
    return this.href;
  }

  get iconProps() {
    return { iconKey: this.key };
  }
}

export default LinkFile;
