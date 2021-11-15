import React, { useEffect, useState } from 'react';
import './stylesheet.scss';
import { classes, getWindowKey } from 'common/utils';
import { useHistory, useLocation } from 'react-router-dom';
import Link from 'components/Link';

function Window({ className, windowKey, defaultLeft, defaultTop, defaultWidth, defaultHeight, noToolbar, children, zIndex, onFocus, onChangeOpened, onChangeSubKeys }) {
  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;
  const focused = getWindowKey(currentPath) === windowKey;

  const [opened, setOpened] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [lastPath, setLastPath] = useState(`/${windowKey}`);
  useEffect(() => {
    if (focused) {
      if (onFocus) onFocus();
      setOpened(true);
      setMinimized(false);
    }
  }, [focused]);
  useEffect(() => {
    if (focused) {
      if (onChangeSubKeys) {
        const keys = currentPath.split('/');
        const subKeys = keys.slice(2);
        onChangeSubKeys(subKeys);
      }
      setLastPath(currentPath);
    }
  }, [focused, currentPath]);
  useEffect(() => {
    if (onChangeOpened) onChangeOpened(opened, windowKey);
  }, [opened]);

  const [left, setLeft] = useState(defaultLeft);
  const [top, setTop] = useState(defaultTop);
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [moving, setMoving] = useState(false);
  const [resizing, setResizing] = useState(false);

  return (
    <div
      className={classes('Window', className, noToolbar && 'no-toolbar', focused && 'focused', opened && 'opened', minimized && 'minimized', maximized && 'maximized', moving && 'moving', resizing && 'resizing')}
      style={{ width, height, top, left, zIndex }}
      onClick={e => {
        e.stopPropagation();
        if (!focused) history.push(lastPath);
      }}>
      <div className="toolbar" onMouseDown={e => {
        // if (mobile) return;
        if (e.button !== 0) return;
        if (maximized) return;
        setMoving(true);
        const offsetX = e.clientX;
        const offsetY = e.clientY;
        const onMouseMove = e => {
          const dx = e.clientX - offsetX;
          const dy = e.clientY - offsetY;
          setLeft(left + dx);
          setTop(top + dy);
        };
        const onMouseUp = () => {
          setMoving(false);
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      }}>
        <div className="button-container">
          <Link className="button button-close" path="/" onClick={() => setOpened(false)}/>
          <Link className="button button-minimize" path="/" onClick={() => setMinimized(true)}/>
          <Link className="button button-maximize" path={lastPath} onClick={() => setMaximized(!maximized)}/>
        </div>
        {
          windowKey === 'browser' ? (
            <div className="tab-container">
            </div>
          ) : (
            <div className="title-container">
              <div className="icon"></div>
              <div className="name"></div>
            </div>
          )
        }
      </div>
      <div className="content">
        {children}
        <div className="interceptor"/>
      </div>
      {
        [
          ['top'],
          ['bottom'],
          ['left'],
          ['right'],
          ['top', 'left'],
          ['top', 'right'],
          ['bottom', 'left'],
          ['bottom', 'right'],
        ].map(sides => (
          <div key={sides.join('-')} className={classes('border', ...sides.map(side => `border-${side}`))}
               onMouseDown={e => {
                 // if (mobile) return;
                 if (e.button !== 0) return;
                 if (maximized) return;
                 setResizing(true);
                 const offsetX = e.clientX;
                 const offsetY = e.clientY;
                 const onMouseMove = e => {
                   const dx = e.clientX - offsetX;
                   const dy = e.clientY - offsetY;
                   let newLeft = left;
                   let newTop = top;
                   let newWidth = width;
                   let newHeight = height;
                   sides.forEach(side => {
                     switch (side) {
                       case 'top':
                         newTop += dy;
                         newHeight -= dy;
                         break;
                       case 'left':
                         newLeft += dx;
                         newWidth -= dx;
                         break;
                       case 'bottom':
                         newHeight += dy;
                         break;
                       case 'right':
                         newWidth += dx;
                         break;
                     }
                   });
                   if (newWidth < 280 || newHeight < 60) return;
                   setLeft(newLeft);
                   setTop(newTop);
                   setWidth(newWidth);
                   setHeight(newHeight);
                 };
                 const onMouseUp = () => {
                   setResizing(false);
                   window.removeEventListener('mousemove', onMouseMove);
                   window.removeEventListener('mouseup', onMouseUp);
                 };
                 window.addEventListener('mousemove', onMouseMove);
                 window.addEventListener('mouseup', onMouseUp);
               }}/>
        ))
      }
    </div>
  );
}

export default Window;
