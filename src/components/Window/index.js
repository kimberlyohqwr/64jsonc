import React, { useEffect, useState } from 'react';
import './stylesheet.scss';
import { classes, namize } from 'common/utils';
import { useHistory } from 'react-router-dom';
import { Icon, Link } from 'components';

function Window({
                  className, iconProps, title, tabs, noToolbar, children, onKeyDown, onKeyPress,
                  onUpdate, windowProps,
                }) {
  const {
    windowKey, path, opened, focused,
    defaultWidth, defaultHeight, defaultLeft, defaultTop,
  } = windowProps;

  const history = useHistory();

  const [[left, top, width, height], setCoords] = useState([defaultLeft, defaultTop, defaultWidth, defaultHeight]);
  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [moving, setMoving] = useState(false);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    if (focused && onKeyDown) {
      window.addEventListener('keydown', onKeyDown);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [focused, onKeyDown]);

  useEffect(() => {
    if (focused && onKeyPress) {
      window.addEventListener('keypress', onKeyPress);
      return () => {
        window.removeEventListener('keypress', onKeyPress);
      };
    }
  }, [focused, onKeyPress]);

  useEffect(() => {
    if (focused && minimized) {
      setMinimized(false);
    }
  }, [focused]);

  return (
    <div
      className={classes('Window', className, noToolbar && 'no-toolbar', focused && 'focused', opened && 'opened', minimized && 'minimized', maximized && 'maximized', moving && 'moving', resizing && 'resizing')}
      style={{ left, top, width, height }}
      onMouseDown={e => {
        e.stopPropagation();
        if (!focused) history.push(path);
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
          setCoords([
            left + dx,
            top + dy,
            width,
            height,
          ]);
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
          <Link className="button button-close" path="/" onClick={() => onUpdate({ opened: false })}/>
          <Link className="button button-minimize" path="/" onClick={() => setMinimized(true)}/>
          <Link className="button button-maximize" path={path} onClick={() => setMaximized(!maximized)}/>
        </div>
        {
          tabs ? (
            <div className="tab-container">
              {tabs}
            </div>
          ) : (
            <div className="title-container">
              <Icon className="icon" {...(iconProps || { iconKey: windowKey })}/>
              <div className="name">{title || namize(windowKey)}</div>
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
                       default:
                     }
                   });
                   if (newWidth < 280 || newHeight < 60) return;
                   setCoords([
                     newLeft,
                     newTop,
                     newWidth,
                     newHeight,
                   ]);
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
