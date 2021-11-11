import React, { useEffect, useState } from 'react';
import './stylesheet.scss';
import Shortcut from 'components/Shortcut';

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
        <div className="icon icon-profile"/>
        <div className="name">Jinseo Park</div>
      </div>
      <div className="shortcut-container">
        <Shortcut type="directory"/>
        <Shortcut type="browser" hidden/>
        <Shortcut type="terminal"/>
        <Shortcut type="instagram"/>
        <Shortcut type="paypal"/>
        <Shortcut type="version_history"/>
        <Shortcut type="attribution"/>
      </div>
      <div className="label label-clock">
        <div className="name">{clock}</div>
      </div>
    </div>
  );
}

export default Taskbar;
