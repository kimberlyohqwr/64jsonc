import React from 'react';
import { Link as PathLink } from 'react-router-dom';

function Link({ href, path, onMouseDown, ...props }) {
  const handleMouseDown = e => {
    e.stopPropagation();
    e.preventDefault();
    if (onMouseDown) onMouseDown(e);
  };

  return href ? (
    <a href={href} onMouseDown={handleMouseDown} {...props}/>
  ) : (
    <PathLink to={path} onMouseDown={handleMouseDown} {...props}/>
  );
}

export default Link;
