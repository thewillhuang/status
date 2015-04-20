'use strict';
var gulp = require('gulp');
var config = require('../config').markup;
var browserSync  = require('browser-sync');
var cache = require('gulp-cached');

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(cache('markup')) //cache files and skip unchanged files
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
