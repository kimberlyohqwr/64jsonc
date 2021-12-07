import React from 'react';
import { Link as PathLink } from 'react-router-dom';
import { classes } from 'common/utils';

function Link({ className, href, path, onMouseDown, onClick, ...props }, ref) {
  const handleMouseDown = e => {
    e.stopPropagation();
    e.preventDefault();
    if (onMouseDown) onMouseDown(e);
  };

  const handleClick = e => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  const commonProps = {
    ref,
    ...props,
    onMouseDown: handleMouseDown,
    onClick: handleClick,
  };

  return href !== undefined ? (
    <a className={classes(className, 'link-external')} href={href} target="_blank" rel="noopener" {...commonProps}/>
  ) : (
    <PathLink className={className} to={path} {...commonProps}/>
  );
}

export default React.forwardRef(Link);
