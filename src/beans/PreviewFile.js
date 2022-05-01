import { File } from 'beans';

class PreviewFile extends File {
  constructor(content, key, parent) {
    super(key, parent);
    this.content = content;
  }

  get name() {
    return this.content.name;
  }

  get iconProps() {
    return { iconUrl: this.content.image };
  }

  get searchables() {
    return [...super.searchables, ...Object.values(this.content)];
  }
}

export default PreviewFile;
