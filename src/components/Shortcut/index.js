import React from 'react';
import './stylesheet.scss';
import { classes, name } from 'common/utils';
import Icon from 'components/Icon';
import Link from 'components/Link';

function Shortcut({ path, hidden, active }) {
  return (
    <Link className={classes('Shortcut', hidden && 'hidden', active && 'active')} path={path}>
      <Icon className="icon" path={path}/>
      <div className="name">{name(path)}</div>
    </Link>
  );
}

export default Shortcut;
