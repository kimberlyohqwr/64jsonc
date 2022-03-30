import React from 'react';
import { classes } from 'common/utils';
import * as imageUrlMap from './images';
import * as badgeUrlMap from './images/badges';
import './stylesheet.scss';

function Icon({ className, iconKey, imageUrl, badgeKey }) {
  return (
    <div className={classes('Icon', className)}
         style={{ backgroundImage: `url(${imageUrl || imageUrlMap[iconKey]})` }}>
      {
        badgeKey in badgeUrlMap && (
          <div className="badge" style={{ backgroundImage: `url(${badgeUrlMap[badgeKey]})` }}/>
        )
      }
    </div>
  );
}

export default Icon;
