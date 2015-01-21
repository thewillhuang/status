'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var config      = require('../config');
var reload = browserSync.reload;

gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon(config.nodemon)
  .on('start', function() {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function() {
    setTimeout(function() {
      reload(config.browserSync);
    }, 1000);
  });
});
