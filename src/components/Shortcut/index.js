import React from 'react';
import './stylesheet.scss';
import { classes } from 'common/utils';
import { Icon, Link } from 'components';

function Shortcut({ target, desktop, taskbar }) {
  return (
    <Link
      className={classes('Shortcut', desktop && 'desktop', taskbar && 'taskbar', target.pinned && 'pinned', target.opened && 'active')}
      url={target.url}>
      <Icon className="icon" {...target.iconProps}/>
      {
        desktop &&
        <div className="name">
          {target.name}
        </div>
      }
    </Link>
  );
}

export default Shortcut;
