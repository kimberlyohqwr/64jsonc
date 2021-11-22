import React, { useEffect, useState } from 'react';
import './stylesheet.scss';
import { classes } from 'common/utils';
import { useHistory } from 'react-router-dom';
import Link from 'components/Link';
import Icon from '../Icon';

function Window({
                  className, iconProps, title, noToolbar, children, onKeyDown,
                  onUpdate, onFocus, windowProps,
                }) {
  const { windowKey, width, height, left, top, path, opened, minimized, maximized, focused } = windowProps;

  const history = useHistory();

  useEffect(() => {
    if (focused && onKeyDown) {
      window.addEventListener('keydown', onKeyDown);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [focused, onKeyDown]);

  const [moving, setMoving] = useState(false);
  const [resizing, setResizing] = useState(false);

  return (
    <div
      className={classes('Window', className, noToolbar && 'no-toolbar', focused && 'focused', opened && 'opened', minimized && 'minimized', maximized && 'maximized', moving && 'moving', resizing && 'resizing')}
      style={{ width, height, top, left }}
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
          onUpdate({
            left: left + dx,
            top: top + dy,
          });
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
          <Link className="button button-close" path="/" onClick={() => onUpdate({
            opened: false,
            path: `/${windowKey}`,
          })}/>
          <Link className="button button-minimize" path="/" onClick={() => onUpdate({ minimized: true })}/>
          <Link className="button button-maximize" path={path}
                onClick={() => onUpdate({ maximized: !maximized })}/>
        </div>
        {
          windowKey === 'browser' ? (
            <div className="tab-container">
            </div>
          ) : (
            <div className="title-container">
              <Icon className="icon" {...iconProps}/>
              <div className="name">{title}</div>
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
                   onUpdate({
                     left: newLeft,
                     top: newTop,
                     width: newWidth,
                     height: newHeight,
                   });
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
