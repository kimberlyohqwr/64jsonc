export const namize = id => id.split('_').map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ');

export const classes = (...classes) => classes.filter(v => v).join(' ');

export const getWindowKey = path => path.split('/')[1];

export const getSubKeys = path => path.split('/').slice(2);
