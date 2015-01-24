'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('mochaTest', function () {
  process.env.NODE_ENV = 'test';
  gulp.src(['server.js','server/tests/**/*.js'])
      .pipe(mocha({reporter: 'spec'}));
});
