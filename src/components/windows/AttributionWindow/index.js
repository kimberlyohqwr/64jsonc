import React from 'react';
import './stylesheet.scss';
import { Icon, Link, Window } from 'components';
import attributions from './data/attributions';

function AttributionWindow({ app, ...restProps }) {
  return (
    <Window className="AttributionWindow"
            defaultWidth={30 * 16} defaultHeight={30 * 16}
            app={app} {...restProps}>
      <div className="row-container">
        {
          attributions.map(attribution => (
            <div className="row" key={attribution.image}>
              <Icon className="icon" imageUrl={attribution.image}/>
              <div className="info">
                <Link className="path" url={attribution.image}>{attribution.image.split('/').pop()}</Link>
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
