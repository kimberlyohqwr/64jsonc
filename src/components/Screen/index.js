import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './stylesheet.scss';
import { Desktop, Taskbar } from 'components';
import { AttributionWindow, BrowserWindow, DirectoryWindow, PaypalWindow } from 'components/windows';
import { WindowsContext } from 'contexts';

const defaultWindows = [{
  Component: DirectoryWindow,
  windowKey: 'directory',
  defaultWidth: 50 * 16,
  defaultHeight: 30 * 16,
}, {
  Component: BrowserWindow,
  windowKey: 'browser',
  defaultWidth: 60 * 16,
  defaultHeight: 40 * 16,
}, {
  Component: PaypalWindow,
  windowKey: 'paypal',
  defaultWidth: 50 * 16,
  defaultHeight: 30 * 16,
}, {
  Component: AttributionWindow,
  windowKey: 'attribution',
  defaultWidth: 30 * 16,
  defaultHeight: 30 * 16,
}].map((window, i) => ({
  ...window,
  defaultLeft: (i + 1) * 20,
  defaultTop: (i + 1) * 20,
  path: `/${window.windowKey}`,
  opened: false,
  focused: false,
  instance: 0,
}));

function Screen() {
  const [windows, setWindows] = useState(defaultWindows);

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
