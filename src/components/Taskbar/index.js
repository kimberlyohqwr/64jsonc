import React, { useContext, useEffect, useState } from 'react';
import './stylesheet.scss';
import { Icon, Shortcut } from 'components';
import { FileSystemContext, ResponsiveContext } from 'contexts';
import { bio } from 'data';

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
      <div className="label label-profile">
        {
          !mobile &&
          <Icon className="icon" iconKey="profile"/>
        }
        <div className="name">{bio.full_name}</div>
      </div>
      <div className="shortcut-container">
        {
          apps && apps.map(app => (
            <Shortcut key={app.key} taskbar target={app}/>
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
