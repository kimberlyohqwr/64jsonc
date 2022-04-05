import React from 'react';
import { classes } from 'common/utils';
import * as iconMap from 'images/icons';
import * as badgeMap from 'images/badges';
import './stylesheet.scss';

function Icon({ className, iconKey, iconUrl, badgeKey }) {
  return (
    <div className={classes('Icon', className)}
         style={{ backgroundImage: `url(${iconUrl || iconMap[iconKey]})` }}>
      {
        badgeKey in badgeMap && (
          <div className="badge" style={{ backgroundImage: `url(${badgeMap[badgeKey]})` }}/>
        )
      }
    </div>
  );
}

export default Icon;
