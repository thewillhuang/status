'use strict';
/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/
var gulp     = require('gulp');
var config   = require('../config');
// var watchify = require('./browserify');
var livereload = require('gulp-livereload');

gulp.task('watch', ['watchify', 'browserSync'], function() {
  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.copy.src, ['copy']);
  gulp.watch(config.gulp.src, ['gulp']);

  var server = livereload();
  gulp.watch(['gulpfile.js', 'server.js', 'config/**/*.js', 'server/**/*.js', 'app/js/**/*.js', 'app/modules/**/*.js'], ['jshint']);
  gulp.watch(['app/**/css/*.sass'], ['csslint']);

  gulp.watch(['gulpfile.js', 'server.js', 'config/**/*.js', 'server/**/*.js', 'app/modules/**/views/*.html', 'app/js/**/*.js', 'app/modules/**/*.js', 'app/**/css/*.scss']).on('change', function(file) {
    server.changed(file.path);
  });
});
