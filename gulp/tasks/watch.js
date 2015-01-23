'use strict';
/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/
var gulp     = require('gulp');
var config   = require('../config');
// var watchify = require('./browserify');

gulp.task('watch', ['watchify', 'browserSync'], function() {
  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.copy.src, ['copy']);
  gulp.watch(config.gulp.src, ['gulp']);
});
