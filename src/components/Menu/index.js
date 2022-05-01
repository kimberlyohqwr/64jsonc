import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FileSystemContext } from 'contexts';
import { Dir, LinkFile } from 'beans';
import { Icon, Link } from '../index';
import { bio } from 'data';
import { classes } from 'common/utils';
import './stylesheet.scss';

function Menu() {
  const [rootDir] = useContext(FileSystemContext);
  const [keyword, setKeyword] = useState('');
  const [opened, setOpened] = useState(false);
  const [closing, setClosing] = useState(false);
  const desktopDir = rootDir.getDesktopDir();
  const directories = desktopDir && desktopDir.children.filter(child => child instanceof Dir);
  const linkFiles = desktopDir && desktopDir.children.filter(child => child instanceof LinkFile);

  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    const opened = currentUrl === '/menu';
    if (opened) {
      setOpened(true);
    } else {
      setClosing(true);
      setTimeout(() => {
        setClosing(false);
        setOpened(false);
      }, 200);
    }
  }, [currentUrl]);

  return opened && (
    <div className={classes('Menu', closing && 'closing')}>
      <div className="overlay">
        <div className="sidebar">
          <div className="avatar" style={{ backgroundImage: `url(${bio.avatar_url}?type=normal)` }}/>
          {
            linkFiles && linkFiles.map(child => (
              <Link className="shortcut" url={child.url} key={child.key}>
                <Icon className="icon" {...child.iconProps}/>
              </Link>
            ))
          }
        </div>
        <div className="body">
          <div className="list">
            {
              keyword ? (
                <div className="group">
                  <div className="header">
                    Search Results for "{keyword}"
                  </div>
                  {
                    rootDir.search(keyword).map(child => (
                      <Link className="item" url={child.url} key={`item-${child.key}`}>
                        <Icon className="icon" {...child.iconProps}/>
                        <div className="name">{child.name}</div>
                      </Link>
                    ))
                  }
                </div>
              ) : (
                <div className="group">
                  <div className="header">
                    Recent Items
                  </div>
                  {
                    directories && directories.flatMap(dir => [(
                      <Link className="item" url={dir.url} key={`dir-${dir.key}`}>
                        <Icon className="icon" {...dir.iconProps}/>
                        <div className="name">{dir.name}</div>
                        <div className="total">{dir.children.length} items</div>
                      </Link>
                    ), dir.children.slice(0, 2).map(child => (
                      <Link className="item indented" url={child.url} key={`item-${child.key}`}>
                        <Icon className="icon" {...child.iconProps}/>
                        <div className="name">{child.name}</div>
                      </Link>
                    ))])
                  }
                </div>
              )
            }
          </div>
          <div className="search-container">
            <input type="text" className="search" value={keyword} onChange={e => setKeyword(e.target.value)}
                   placeholder={'Search "Georgia"'} autoFocus/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
