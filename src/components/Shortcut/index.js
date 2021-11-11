import React from 'react';
import './stylesheet.scss';
import { classes, name } from 'common/utils';
import Icon from 'components/Icon';

function Shortcut({ type, hidden }) {
  return (
    <a className={classes('Shortcut', hidden && 'hidden')} href={`#${type}`}>
      <Icon className="icon" type={type}/>
      <div className="name">{name(type)}</div>
    </a>
  );
}

export default Shortcut;
