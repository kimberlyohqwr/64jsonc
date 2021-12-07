import { rootDir, windows } from 'data';

export const namize = id => id.split('_').map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ');

export const classes = (...classes) => classes.filter(v => v).join(' ');

export const getWindowKey = path => {
  const [directoryKey] = getPathKeys(path);
  const { desktop } = rootDir.users.jason;
  const directory = desktop[directoryKey];
  if (directory) {
    return directory.windowKey;
  }
  const window = windows.find(w => w.windowKey === directoryKey);
  if (window) {
    return window.windowKey;
  }
  return undefined;
};

export const getPathKeys = path => path.split('/').slice(1);
