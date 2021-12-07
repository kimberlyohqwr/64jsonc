import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './stylesheet.scss';
import { Desktop, Taskbar } from 'components';
import { FileSystemContext, WindowsContext } from 'contexts';
import { rootDir, windows } from 'data';


function Screen() {
  const [rootDirRefresh, setRootDirRefresh] = useState(0);
  const [windowsRefresh, setWindowsRefresh] = useState(0);

  const refreshRootDir = () => setRootDirRefresh(rootDirRefresh + 1);
  const refreshWindows = () => setWindowsRefresh(windowsRefresh + 1);

  return (
    <Router>
      <FileSystemContext.Provider value={[rootDir, refreshRootDir]}>
        <WindowsContext.Provider value={[windows, refreshWindows]}>
          <div className="Screen">
            <Desktop/>
            <Taskbar/>
          </div>
        </WindowsContext.Provider>
      </FileSystemContext.Provider>
    </Router>
  );
}

export default Screen;
