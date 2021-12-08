import { SystemDir } from 'beans';

class DesktopDir extends SystemDir {
  constructor(children, wallpaper, key, parent) {
    super(children, key, parent);
    this.wallpaper = wallpaper;
  }
}

export default DesktopDir;
