import React, { useContext, useEffect, useState } from 'react';
import { Icon, Link } from 'components';
import { FileSystemContext, ResponsiveContext } from 'contexts';
import { bio } from 'data';
import './stylesheet.scss';
import { useLocation } from 'react-router-dom';
import { classes } from '../../common/utils';

const getClock = () => {
  const two = (x) => x < 10 ? `0${x}` : x;
  const date = new Date();
  const H = date.getHours();
  const m = date.getMinutes();
  const hh = two(H % 12 || 12);
  const mm = two(m);
  const A = ['AM', 'PM'][H / 12 | 0];
  return `${hh}:${mm} ${A}`;
};

function Taskbar() {
  const mobile = useContext(ResponsiveContext);
  const [rootDir] = useContext(FileSystemContext);
  const apps = rootDir.getApps();

  const [clock, setClock] = useState(getClock());

  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    const interval = window.setInterval(() => {
      const clock = getClock();
      setClock(clock);
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="Taskbar">
      <Link className="label label-profile" url={currentUrl === '/menu' ? '' : '/menu'}>
        {
          !mobile &&
          <div className="avatar" style={{ backgroundImage: `url(${bio.avatar_url}?type=normal)` }}/>
        }
        <div className="name">{bio.full_name}</div>
      </Link>
      <div className="shortcut-container">
        {
          apps && apps.map(app => (
            <Link
              className={classes('shortcut', app.pinned && !mobile && 'pinned', app.opened && !app.closing && 'active')}
              url={app.url} key={app.key}>
              <Icon className="icon" {...app.iconProps}/>
            </Link>
          ))
        }
      </div>
      {
        !mobile &&
        <div className="label label-clock">
          <div className="name">{clock}</div>
        </div>
      }
    </div>
  );
}

export default Taskbar;
