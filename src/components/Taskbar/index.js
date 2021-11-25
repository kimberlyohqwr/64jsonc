import React, { useEffect, useState } from 'react';
import './stylesheet.scss';
import Shortcut from 'components/Shortcut';
import Icon from '../Icon';

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

function Taskbar({ windows }) {
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
        <Icon className="icon" windowKey="profile"/>
        <div className="name">Jinseo Park</div>
      </div>
      <div className="shortcut-container">
        {
          [
            'directory',
            'browser',
            'terminal',
            'instagram',
            'paypal',
            'version_history',
            'attribution',
          ].map(windowKey => {
            const window = windows.find(w => w.windowKey === windowKey);
            if (!window) return;
            return (
              <Shortcut key={windowKey} path={window.path} hidden={windowKey === 'browser'}
                        active={window.opened}/>
            );
          })
        }
      </div>
      <div className="label label-clock">
        <div className="name">{clock}</div>
      </div>
    </div>
  );
}

export default Taskbar;
