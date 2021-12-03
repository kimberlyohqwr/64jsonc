import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './stylesheet.scss';
import { Desktop, Taskbar } from 'components';
import { AttributionWindow, BrowserWindow, DirectoryWindow } from 'components/windows';
import { WindowsContext } from 'contexts';

function Screen() {
  const [windows, setWindows] = useState([{
    Component: DirectoryWindow,
    windowKey: 'directory',
    defaultWidth: 48 * 16,
    defaultHeight: 28 * 16,
  }, {
    Component: BrowserWindow,
    windowKey: 'browser',
    defaultWidth: 60 * 16,
    defaultHeight: 40 * 16,
  }, {
    Component: AttributionWindow,
    windowKey: 'attribution',
    defaultWidth: 32 * 16,
    defaultHeight: 28 * 16,
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
