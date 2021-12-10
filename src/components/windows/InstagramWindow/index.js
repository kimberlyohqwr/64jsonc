import React from 'react';
import './stylesheet.scss';
import { Link, Window } from 'components';
import instaRatio from './images/insta-ratio.png';
import instagrams from './data/instagrams';

function InstagramWindow(props) {
  return (
    <Window className="InstagramWindow" noToolbar
            defaultWidth={44 * 16} defaultHeight={30 * 16}
            {...props}>
      <div className="photo-container">
        {
          instagrams.map(instagram => (
            <Link className="photo" key={instagram} url={`https://instagram.com/p/${instagram}/`}
                  style={{ backgroundImage: `url(https://instagram.com/p/${instagram}/media/?size=m)` }}>
              <img className="ratio" src={instaRatio}/>
            </Link>
          ))
        }
      </div>
    </Window>
  );
}

export default InstagramWindow;
