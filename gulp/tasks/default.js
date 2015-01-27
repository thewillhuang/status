'use strict';
var gulp = require('gulp');

gulp.task('default', ['jshint', 'images', 'copy', 'markup', 'sass', 'watch']);
