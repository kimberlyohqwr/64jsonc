'use strict';

import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import connect from 'gulp-connect';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import pkg from './package';

const srcPath = path.join(__dirname, 'src');
const dataPath = path.join(srcPath, 'data');
const jsPath = path.join(srcPath, 'js');
const pugPath = path.join(srcPath, 'pug');
const sassPath = path.join(srcPath, 'scss');
const staticPath = path.join(srcPath, 'static');
const builtPath = './built';
const port = 8080;

gulp.task('buildJs', () =>
  gulp
    .src(path.join(jsPath, 'script.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(builtPath))
    .pipe(connect.reload()),
);

gulp.task('buildPug', () => {
  const locals = {
    description: pkg.description,
    author: pkg.author,
    data: {},
  };
  fs.readdirSync(dataPath).filter(file => file.endsWith('.js')).forEach(file => {
    const name = file.slice(0, -3);
    const filePath = path.join(dataPath, file);
    delete require.cache[require.resolve(filePath)];
    locals.data[name] = require(filePath);
  });
  return gulp
    .src(path.join(pugPath, 'index.pug'))
    .pipe(pug({ locals }))
    .pipe(gulp.dest(builtPath))
    .pipe(connect.reload());
});

gulp.task('buildSass', () =>
  gulp
    .src(path.join(sassPath, 'stylesheet.scss'))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(builtPath))
    .pipe(connect.reload()),
);

gulp.task('copyStatic', () =>
  gulp
    .src(path.join(staticPath, '**', '*'), { base: staticPath })
    .pipe(gulp.dest(builtPath)),
);

gulp.task('copySource', () =>
  gulp
    .src(path.join(jsPath, '**', '*'), { base: jsPath })
    .pipe(gulp.dest(builtPath)),
);

gulp.task('openServer', done => {
  connect.server({
    port,
    root: builtPath,
    livereload: true,
  });
  done();
});

gulp.task('closeServer', done => {
  connect.serverClose();
  done();
});

gulp.task('watch', done => {
  gulp.watch(jsPath, gulp.parallel('buildJs', 'copySource'));
  gulp.watch(dataPath, gulp.series('buildPug'));
  gulp.watch(pugPath, gulp.series('buildPug'));
  gulp.watch(sassPath, gulp.series('buildSass'));
  gulp.watch(staticPath, gulp.series('copyStatic'));
  done();
});

gulp.task('build', gulp.parallel('buildJs', 'copySource', 'buildPug', 'buildSass', 'copyStatic'));

gulp.task('default', gulp.parallel('openServer', 'build', 'watch'));
