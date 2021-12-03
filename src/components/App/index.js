import React from 'react';
import './stylesheet.scss';
import { getWindowKey, namize } from 'common/utils';
import { Icon } from 'components';
import { Link } from 'components';

function App({ path, href }) {
  return (
    <Link className="App" path={path} href={href}>
      <Icon className="icon" windowKey={getWindowKey(path)}/>
      <div className="name">
        {namize(path.split('/').pop())}
      </div>
    </Link>
  );
}

export default App;
