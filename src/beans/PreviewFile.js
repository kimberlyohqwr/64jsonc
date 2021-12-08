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
    return { imageUrl: this.content.image };
  }
}

export default PreviewFile;
