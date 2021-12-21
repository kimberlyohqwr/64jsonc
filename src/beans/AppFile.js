import { File } from 'beans';

class AppFile extends File {
  static count = 0;

  constructor(WindowComponent, { pinned = true, defaultUrl } = {}, key, parent) {
    super(key, parent);
    AppFile.count++;
    Object.assign(this, {
      WindowComponent,
      pinned,
      defaultUrl,
      defaultLeft: AppFile.count * 20,
      defaultTop: AppFile.count * 20,
      lastUrl: null,
      opened: false,
      focused: false,
      zIndex: 1,
    });
  }

  get url() {
    return this.opened ? this.lastUrl : (this.defaultUrl || `/${this.key}`);
  }

  get iconProps() {
    return { iconKey: this.key };
  }
}

export default AppFile;
