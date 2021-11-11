import React from 'react';
import './stylesheet.scss';
import { classes, getWindowKey } from 'common/utils';
import * as imageUrlMap from './images';

function Icon({ className, path }) {
  const windowName = getWindowKey(path);
  const imageUrl = imageUrlMap[windowName];

  return (
    <div className={classes('Icon', className)} style={{ backgroundImage: `url(${imageUrl})` }}/>
  );
}

export default Icon;
