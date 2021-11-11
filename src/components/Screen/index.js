import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './stylesheet.scss';
import Desktop from 'components/Desktop';
import Taskbar from 'components/Taskbar';

function Screen() {
  const [openedWindowKeys, setOpenedWindowKeys] = useState([]);

  return (
    <Router>
      <div className="Screen">
        <Desktop onChangeOpenedWindowKeys={setOpenedWindowKeys}/>
        <Taskbar openedWindowKeys={openedWindowKeys}/>
      </div>
    </Router>
  );
}

export default Screen;
