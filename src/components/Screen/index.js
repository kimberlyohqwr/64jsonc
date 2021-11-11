import React from 'react';
import './stylesheet.scss';
import Desktop from 'components/Desktop';
import Taskbar from 'components/Taskbar';

function Screen() {
  return (
    <div className="Screen">
      <Desktop/>
      <Taskbar/>
    </div>
  );
}

export default Screen;
