#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const bioPath = path.join(__dirname, '..', 'timeline', 'current.bio');
const bioBody = fs.readFileSync(bioPath, 'utf8');
const bio = JSON.parse(bioBody);

const variables = [];

Object.keys(bio).filter(key => typeof bio[key] === 'string').forEach(key => {
  variables.push(`REACT_APP_${key.toUpperCase()}="${bio[key]}"`);
});

console.log('export ' + variables.join(' '));