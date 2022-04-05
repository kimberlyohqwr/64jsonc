import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getAppKey } from 'common/utils';
import { FileSystemContext, ResponsiveContext } from 'contexts';
import { Icon, Link } from 'components';
import forkme from 'images/forkme.png';
import * as wallpaperMap from 'images/wallpapers';
import './stylesheet.scss';

function Desktop() {
  const mobile = useContext(ResponsiveContext);
  const [rootDir, refreshRootDir] = useContext(FileSystemContext);
  const desktopDir = rootDir.getDesktopDir();
  const apps = rootDir.getApps();

  const history = useHistory();
  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    apps && apps.forEach(app => {
      const focused = getAppKey(currentUrl) === app.key;
      if (focused) {
        app.lastUrl = currentUrl;
        if (!app.opened) {
          app.opened = true;
          app.instance++;
        }
        if (!app.focused) {
          app.zIndex = Math.max(...apps.map(app => app.zIndex)) + 1;
        }
      }
      app.focused = focused;
    });
    refreshRootDir();
  }, [currentUrl]);

  useEffect(() => {
    apps && apps.forEach(app => {
      if (app.closing) {
        setTimeout(() => {
          app.closing = false;
          app.opened = false;
          refreshRootDir();
        }, 200);
      }
    });
  });

  return (
    <div className="Desktop"
         onMouseDown={() => {
           if (currentUrl !== '/') history.push('/');
         }}>
      <div className="wallpaper"
           style={desktopDir && { backgroundImage: `url(${wallpaperMap[desktopDir.wallpaperKey]})` }}/>
      {
        !mobile &&
        <div className="location">
          <div className="pinpoint"/>
          {desktopDir.wallpaperKey.replace(/__/g, ',_').split('_').map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ')}
        </div>
      }
      {
        !mobile &&
        <Link className="forkme" url="https://github.com/parkjs814/parkjs814.github.io">
          <img src={forkme}/>
        </Link>
      }
      <div className="app-container">
        {
          desktopDir && desktopDir.children.map(child => (
            <Link className="shortcut" url={child.url} key={child.key}>
              <Icon className="icon" {...child.iconProps}/>
              <div className="name">
                {child.name}
              </div>
            </Link>
          ))
        }
      </div>
      <div className="window-container">
        {
          apps && apps.filter(app => app.opened).map(app => (
            <app.WindowComponent key={app.key}
                                 app={app}
                                 onUpdate={patch => {
                                   Object.assign(app, patch);
                                   refreshRootDir();
                                 }}/>
          ))
        }
      </div>
    </div>
  );
}

export default Desktop;
