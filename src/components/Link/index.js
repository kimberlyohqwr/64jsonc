import React from 'react';
import { Link as PathLink } from 'react-router-dom';
import { classes } from 'common/utils';

function Link({ className, url, onMouseDown, onClick, ...props }, ref) {
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

  return url && url.startsWith('/') ? (
    <PathLink className={className} to={url} {...commonProps}/>
  ) : (
    <a className={classes(className, 'link-external')} href={url} target="_blank" rel="noopener" {...commonProps}/>
  );
}

export default React.forwardRef(Link);
