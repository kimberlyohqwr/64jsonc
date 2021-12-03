import React from 'react';
import './stylesheet.scss';
import { Icon, Link, Window } from 'components';
import { namize } from 'common/utils';
import attributions from './data/attributions';

function AttributionWindow({ windowProps, ...restProps }) {
  const { windowKey } = windowProps;

  return (
    <Window className="AttributionWindow" windowKey={windowKey}
            title={namize(windowKey)}
            iconProps={{ windowKey }}
            windowProps={windowProps}
            {...restProps}>
      <div className="row-container">
        {
          attributions.map(attribution => (
            <div className="row">
              <Icon className="icon" imageUrl={attribution.image}/>
              <div className="info">
                <Link className="path" href={attribution.image}>{attribution.image.split('/').pop()}</Link>
                <div className="artist">{attribution.artist}</div>
              </div>
              <Link className="link" href={attribution.link}>Link</Link>
            </div>
          ))
        }
      </div>
    </Window>
  );
}

export default AttributionWindow;
/*
  .row-container
    each attribution in data.attributions
      .row
        .icon(style=`background-image: url(${attribution.image})`)
        .info
          a.path(href=attribution.image)= attribution.image
          .artist= attribution.artist
        a.link(href=attribution.link) Link
 */
