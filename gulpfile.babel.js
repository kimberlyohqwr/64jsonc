'use strict';

import path from 'path';
import gulp from 'gulp';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import gutil from 'gulp-util';
import through from 'through2';
import puppeteer from 'puppeteer';
import connect from 'gulp-connect';

const srcPath = path.join(__dirname, 'resume');
const sassPath = path.join(srcPath, 'resume.sass');
const pugPath = path.join(srcPath, 'resume.pug');
const buildPath = path.join(__dirname, 'build');
const htmlPath = path.join(buildPath, 'resume.html');
const port = 8080;

gulp.task('buildSass', () =>
  gulp
    .src(sassPath)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(buildPath))
    .pipe(connect.reload()),
);

gulp.task('buildPug', () =>
  gulp
    .src(pugPath)
    .pipe(pug({}))
    .pipe(gulp.dest(buildPath))
    .pipe(connect.reload()),
);

gulp.task('createPDF', () =>
  gulp
    .src(htmlPath)
    .pipe(through.obj(function (file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);
        return;
      }
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://localhost:${port}/resume.html`, { waitUntil: 'networkidle2' });
        await new Promise(resolve => setTimeout(resolve, 1000)); // TODO: need to find a better way to fix FontAwesome not showing up
        const buffer = await page.pdf({ printBackground: true });
        await browser.close();
        file.contents = buffer;
        file.path = gutil.replaceExtension(file.path, '.pdf');
        cb(null, file);
      })();
    }))
    .pipe(gulp.dest(buildPath)),
);

gulp.task('openServer', done => {
  connect.server({
    port,
    root: buildPath,
    livereload: true,
  });
  done();
});

gulp.task('closeServer', done => {
  connect.serverClose();
  done();
});

gulp.task('watch', done => {
  gulp.watch(sassPath, gulp.series('buildSass'));
  gulp.watch(pugPath, gulp.series('buildPug'));
  done();
});

gulp.task('build', gulp.series(
  'openServer',
  gulp.parallel('buildSass', 'buildPug'),
  'createPDF',
  'closeServer',
));

gulp.task('default', gulp.series(
  'openServer',
  gulp.parallel('buildSass', 'buildPug'),
  'watch',
));
