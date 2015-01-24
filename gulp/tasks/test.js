'use strict';

var gulp = require('gulp');

// Test task.
gulp.task('test', ['loadConfig', 'mochaTest']);
