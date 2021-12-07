import React, { useContext, useEffect, useState } from 'react';
import './stylesheet.scss';
import { Icon, Shortcut } from 'components';
import { WindowsContext } from 'contexts';

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
  const [windows] = useContext(WindowsContext);
  const [clock, setClock] = useState(getClock());
  const [shortcutKeys, setShortcutKeys] = useState(windows.map(w => w.windowKey));

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
        <Icon className="icon" iconKey="profile"/>
        <div className="name">Jinseo Park</div>
      </div>
      <div className="shortcut-container">
        {
          shortcutKeys.map(windowKey => {
            const window = windows.find(w => w.windowKey === windowKey);
            return (
              <Shortcut key={window.windowKey} taskbar
                        iconKey={window.windowKey} path={window.opened ? window.path : window.defaultPath}
                        pinned={window.pinned} active={window.opened}/>
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
