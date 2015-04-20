'use strict';
var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');
var cache = require('gulp-cached');

gulp.task('copy', function() {
  return gulp.src(config.copy.src, config.copy.base)
    .pipe(cache('copy'))
    .pipe(gulp.dest(config.copy.dest))
    .pipe(browserSync.reload({stream:true}));
});
