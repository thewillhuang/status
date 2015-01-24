'use strict';

var gulp = require('gulp');
var scsslint = require('gulp-scss-lint');

gulp.task('scsslint', function() {
  gulp.src('/scss/*.scss')
    .pipe(scsslint());
});
