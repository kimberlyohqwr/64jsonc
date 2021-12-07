import React from 'react';
import './stylesheet.scss';
import { classes } from 'common/utils';
import * as imageUrlMap from './images';

function Icon({ className, iconKey, imageUrl }) {
  return (
    <div className={classes('Icon', className)}
         style={{ backgroundImage: `url(${imageUrl || imageUrlMap[iconKey]})` }}/>
  );
}

export default Icon;
