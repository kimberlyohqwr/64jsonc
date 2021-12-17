import React from 'react';
import './stylesheet.scss';
import { Link, Window } from 'components';
import instaRatio from './images/insta-ratio.png';
import instagrams from './data/instagrams';
import InstagramEmbed from 'react-instagram-embed';
import { classes, getUrlKeys } from 'common/utils';
import { useHistory } from 'react-router-dom';

function InstagramWindow(props) {
  const { app } = props;
  const [, activeInstagram] = getUrlKeys(app.url);
  const opened = instagrams.includes(activeInstagram);

  const history = useHistory();

  return (
    <Window className="InstagramWindow" noToolbar
            defaultWidth={30 * 16} defaultHeight={40 * 16}
            {...props}>
      <div className="photo-container">
        {
          instagrams.map(instagram => (
            <Link className="photo" key={instagram} url={`/${app.key}/${instagram}`}
                  style={{ backgroundImage: `url(https://instagram.com/p/${instagram}/media/?size=m)` }}>
              <img className="ratio" src={instaRatio}/>
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
