import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './stylesheet.scss';
import { Desktop, Taskbar } from 'components';
import { FileSystemContext, ResponsiveContext } from 'contexts';
import { rootDir } from 'data';

const isMobile = () => {
  const { clientWidth } = document.body;
  return clientWidth <= 512;
};

function Screen() {
  const [mobile, setMobile] = useState(isMobile());
  const [rootDirRefresh, setRootDirRefresh] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setMobile(isMobile());
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const refreshRootDir = () => setRootDirRefresh(rootDirRefresh + 1);

  return (
    <Router>
      <ResponsiveContext.Provider value={mobile}>
        <FileSystemContext.Provider value={[rootDir, refreshRootDir]}>
          <div className="Screen">
            <Desktop/>
            <Taskbar/>
          </div>
        </FileSystemContext.Provider>
      </ResponsiveContext.Provider>
    </Router>
  );
}

export default Screen;
