import React from 'react';

import { Icon, Link, Window } from 'components';
import { attributions } from 'data';

import './stylesheet.scss';

function AttributionWindow(props) {
  return (
    <Window className="AttributionWindow"
            defaultWidth={30 * 16} defaultHeight={30 * 16}
            contentStyle={{
              justifyContent: 'center',
            }}
            {...props}>
      <div className="row-container">
        {
          attributions.map(attribution => (
            <div className="row" key={attribution.image}>
              <div className="transparent">
                <Icon className="icon" imageUrl={attribution.image}/>
              </div>
              <div className="info">
                <Link className="path" url={attribution.image} external>{attribution.image.split('/').pop()}</Link>
                <div className="artist">{attribution.artist}</div>
              </div>
              <Link className="link" url={attribution.link}>Link</Link>
            </div>
          ))
        }
      </div>
    </Window>
  );
}

export default AttributionWindow;
