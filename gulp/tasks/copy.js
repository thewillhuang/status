'use strict';
var gulp = require('gulp');
var config = require('../config').copy;
var browserSync = require('browser-sync');

gulp.task('copy', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
