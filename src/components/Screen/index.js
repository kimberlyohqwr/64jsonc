import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './stylesheet.scss';
import { Desktop, Taskbar } from 'components';
import { FileSystemContext } from 'contexts';
import { rootDir } from 'data';


function Screen() {
  const [rootDirRefresh, setRootDirRefresh] = useState(0);

  const refreshRootDir = () => setRootDirRefresh(rootDirRefresh + 1);

  return (
    <Router>
      <FileSystemContext.Provider value={[rootDir, refreshRootDir]}>
        <div className="Screen">
          <Desktop/>
          <Taskbar/>
        </div>
      </FileSystemContext.Provider>
    </Router>
  );
}

export default Screen;
