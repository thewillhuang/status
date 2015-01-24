'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  gulp.src(['gulpfile.js', 'server.js', 'config/**/*.js', 'server/**/*.js', 'app/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
