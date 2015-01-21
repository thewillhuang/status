'use strict';
var browserSync  = require('browser-sync');
var gulp      = require('gulp');
var config    = require('../config').production;
var minifyCSS = require('gulp-minify-css');
var size      = require('gulp-filesize');

gulp.task('minifyCss', ['sass'], function() {
  return gulp.src(config.cssSrc)
    .pipe(minifyCSS(config.cssOpt))
    .pipe(gulp.dest(config.dest))
    .pipe(size())
    .pipe(browserSync.reload({stream:true}));
});
