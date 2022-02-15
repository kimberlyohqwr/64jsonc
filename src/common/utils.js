import { RootDir } from 'beans';

export const namize = id => id.split('_').map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ');

export const classes = (...classes) => classes.filter(v => v).join(' ');

export const getAppKey = path => {
  const [dirKey] = getUrlKeys(path);
  const appsDir = RootDir.instance.getAppsDir();
  const app = appsDir.getChild(dirKey);
  if (app) {
    return app.key;
  }
  if (dirKey) {
    return 'finder';
  }
  return undefined;
};

export const isExternal = url => /^(https?:\/\/|mailto:)/.test(url);

export const getUrlKeys = url => url.split('/').slice(1).filter(v => v);
