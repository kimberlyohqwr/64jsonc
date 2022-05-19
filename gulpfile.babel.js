'use strict';

import path from 'path';
import gulp from 'gulp';
import through from 'through2';
import puppeteer from 'puppeteer';
import connect from 'gulp-connect';
import replace from 'gulp-replace';

const indexFilename = 'index.html';
const resumeFilename = 'resume.pdf';
const manifestFilename = 'manifest.json';
const buildPath = path.join(__dirname, 'build');
const htmlPath = path.join(buildPath, indexFilename);
const manifestPath = path.join(buildPath, manifestFilename);
const port = 8080;

gulp.task('replaceManifest', () =>
  gulp
    .src(manifestPath)
    .pipe(replace(/%(REACT_APP_\w+)%/g, (_, key) => process.env[key]))
    .pipe(gulp.dest(buildPath)),
);

gulp.task('captureResume', () =>
  gulp
    .src(htmlPath)
    .pipe(through.obj(async function (file, enc, cb) {
      const browser = await puppeteer.launch({
        args: ['--font-render-hinting=none'],
      });
      const page = await browser.newPage();
      await page.goto(`http://localhost:${port}/#/resume`, { waitUntil: 'networkidle2' });
      const buffer = await page.pdf({ printBackground: true });
      await browser.close();
      file.contents = buffer;
      file.path = file.path.replace(indexFilename, resumeFilename);
      cb(null, file);
    }))
    .pipe(gulp.dest(buildPath)),
);

gulp.task('openServer', done => {
  connect.server({
    port,
    root: buildPath,
  });
  done();
});

gulp.task('closeServer', done => {
  connect.serverClose();
  done();
});

gulp.task('buildResume', gulp.series(
  'openServer',
  'captureResume',
  'closeServer',
));

gulp.task('default', gulp.parallel(
  'replaceManifest',
  'buildResume',
));
