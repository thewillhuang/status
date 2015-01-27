'use strict';

var gulp     = require('gulp');
var applicationJavaScriptFiles,
    applicationCSSFiles,
    applicationTestFiles;

gulp.task('loadConfig', function() {
  var init = require('../../config/init')();
  var config = require('../../config/config');
  applicationJavaScriptFiles = config.assets.js;
  applicationCSSFiles = config.assets.css;
  applicationTestFiles = config.assets.lib.js.concat(config.assets.js, config.assets.tests);
});
