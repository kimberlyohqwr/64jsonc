export const name = id => id.split('_').map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ');

export const classes = (...classes) => classes.filter(v => v).join(' ');
