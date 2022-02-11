import React from 'react';
import { useHistory } from 'react-router-dom';
import InstagramEmbed from 'react-instagram-embed';

import { Link, Window } from 'components';
import { instagrams } from 'data';
import { classes, getUrlKeys } from 'common/utils';

import instaRatio from './images/insta-ratio.png';
import './stylesheet.scss';

function InstagramWindow(props) {
  const { app } = props;
  const [, activeInstagram] = getUrlKeys(app.url);
  const opened = instagrams.includes(activeInstagram);

  const history = useHistory();

  return (
    <Window className="InstagramWindow" noToolbar
            defaultWidth={30 * 16} defaultHeight={40 * 16}
            toolbarStyle={{
              backgroundImage: 'linear-gradient(-135deg, #1400c8, #b900b4, #f50000)',
            }}
            contentStyle={{
              backgroundColor: 'white',
              pointerEvents: 'auto',
            }}
            {...props}>
      <div className="photo-container">
        {
          instagrams.map(instagram => (
            <Link className="photo" key={instagram} url={`/${app.key}/${instagram}`}
                  style={{ backgroundImage: `url(https://instagram.com/p/${instagram}/media/?size=m)` }}>
              <img className="ratio" src={instaRatio} alt="Placeholder"/>
            </Link>
          ))
        }
      </div>
      <InstagramEmbed
        className={classes('embed-container', opened && 'opened')}
        onClick={() => history.push(`/${app.key}`)}
        url={opened && `https://instagr.am/p/${activeInstagram}/`}
        maxWidth={480}
        containerTagName='div'
        injectScript/>
    </Window>
  );
}

export default InstagramWindow;
