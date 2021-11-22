import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './stylesheet.scss';
import Desktop from 'components/Desktop';
import Taskbar from 'components/Taskbar';

function Screen() {
  const [windows, setWindows] = useState([]);

  return (
    <Router>
      <div className="Screen">
        <Desktop onChangeWindows={setWindows}/>
        <Taskbar windows={windows}/>
      </div>
    </Router>
  );
}

export default Screen;
