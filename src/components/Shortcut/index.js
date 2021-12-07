import React from 'react';
import './stylesheet.scss';
import { classes, namize } from 'common/utils';
import { Icon, Link } from 'components';

function Shortcut({ iconKey, path, href, pinned, active, desktop, taskbar }) {
  return (
    <Link
      className={classes('Shortcut', desktop && 'desktop', taskbar && 'taskbar', pinned && 'pinned', active && 'active')}
      path={path} href={href}>
      <Icon className="icon" iconKey={iconKey}/>
      {
        desktop &&
        <div className="name">
          {namize(path.split('/').pop())}
        </div>
      }
    </Link>
  );
}

export default Shortcut;
