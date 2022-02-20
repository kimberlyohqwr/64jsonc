'use strict';

import path from 'path';
import gulp from 'gulp';
import through from 'through2';
import puppeteer from 'puppeteer';
import connect from 'gulp-connect';

const buildPath = path.join(__dirname, 'build');
const htmlFilename = 'index.html';
const pdfFilename = 'resume.pdf';
const htmlPath = path.join(buildPath, htmlFilename);
const port = 8080;

gulp.task('createPDF', () =>
  gulp
    .src(htmlPath)
    .pipe(through.obj(function (file, enc, cb) {
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://localhost:${port}/#/resume`, { waitUntil: 'networkidle2' });
        await new Promise(resolve => setTimeout(resolve, 1000)); // TODO: need to find a better way to fix FontAwesome not showing up
        const buffer = await page.pdf({ printBackground: true });
        await browser.close();
        file.contents = buffer;
        file.path = file.path.replace(htmlFilename, pdfFilename);
        cb(null, file);
      })();
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

gulp.task('default', gulp.series(
  'openServer',
  'createPDF',
  'closeServer',
));
