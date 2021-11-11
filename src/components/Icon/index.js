import React from 'react';
import './stylesheet.scss';
import { classes } from 'common/utils';

function Icon({ className, type }) {
  const imageUrl = {
    terminal: 'img/icon/terminal.png',
    directory: 'img/icon/directory.png',
    github: 'img/icon/github.png',
    resume: 'img/icon/resume.png',
    email: 'img/icon/email.png',
    paypal: 'img/icon/paypal.png',
    profile: 'https://graph.facebook.com/1935436059816712/picture?type=normal',
    browser: 'img/icon/browser.png',
    attribution: 'img/icon/attribution.png',
    instagram: 'img/icon/instagram.png',
    version_history: 'img/icon/version_history.png',
  }[type];

  return (
    <div className={classes('Icon', className)} style={{ backgroundImage: `url(${imageUrl})` }}/>
  );
}

export default Icon;
