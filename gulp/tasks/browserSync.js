'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var config = require('../config.js');
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('browserSync', ['nodemon'], function() {
	browserSync.init(null, config.browserSync);
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon(config.nodemon)
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) {
        called = true;
        cb();
      }
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false   //
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});
