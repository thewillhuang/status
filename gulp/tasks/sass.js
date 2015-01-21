'use strict';
// var gulp         = require('gulp');
// var browserSync  = require('browser-sync');
// var sass         = require('gulp-sass');
// var sourcemaps   = require('gulp-sourcemaps');
// var handleErrors = require('../util/handleErrors');
// var config       = require('../config').sass;
// var autoprefixer = require('gulp-autoprefixer');

// gulp.task('sass', function() {
//   return gulp.src(config.src)
//     .pipe(sourcemaps.init())
//     .pipe(sass(config.settings))
//     .on('error', handleErrors)
//     .pipe(sourcemaps.write())
//     .pipe(autoprefixer({ browsers: ['last 2 version'] }))
//     .pipe(gulp.dest(config.dest))
//     .pipe(browserSync.reload({stream:true}));
// });

var browserSync  = require('browser-sync');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var config       = require('../config').sass;

gulp.task('sass', function() {
  return gulp.src(config.src)
    // Convert sass into css
    .pipe(sass(config.settings))
    // Catch any SCSS errors and prevent them from crashing gulp
    .on('error', function(error) {
      console.error(error);
      this.emit('end');
    })
    // Load existing internal sourcemap
    .pipe(sourcemaps.init(config.sourcemap))
    // Autoprefix properties
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    // Write final .map file
    .pipe(sourcemaps.write())
    // Save the CSS
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
