import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './stylesheet.scss';
import Desktop from 'components/Desktop';
import Taskbar from 'components/Taskbar';
import DirectoryWindow from '../Window/DirectoryWindow';
import BrowserWindow from '../Window/BrowserWindow';

export const WindowsContext = React.createContext(null);

function Screen() {
  const [windows, setWindows] = useState([{
    Component: DirectoryWindow,
    windowKey: 'directory',
    defaultWidth: 50 * 16,
    defaultHeight: 30 * 16,
  }, {
    Component: BrowserWindow,
    windowKey: 'browser',
    defaultWidth: 60 * 16,
    defaultHeight: 40 * 16,
  }].map((window, i) => ({
    ...window,
    defaultLeft: (i + 1) * 20,
    defaultTop: (i + 1) * 20,
    path: `/${window.windowKey}`,
    opened: false,
    focused: false,
    instance: 0,
  })));

  return (
    <Router>
      <WindowsContext.Provider value={[windows, setWindows]}>
        <div className="Screen">
          <Desktop/>
          <Taskbar/>
        </div>
      </WindowsContext.Provider>
    </Router>
  );
}

export default Screen;
