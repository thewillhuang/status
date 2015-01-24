'use strict';

var _    = require('lodash'),
    glob = require('glob');

module.exports = _.extend(
  require('./env/all'),
  require('./env/' + process.env.NODE_ENV) || {}
);

module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
  var _this = this;
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
  var output = [];

  // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function(globPattern) {
      output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      glob(globPatterns, {
        sync: true
      }, function(err, files) {
        if (removeRoot) {
          files = files.map(function(file) {
            return file.replace(removeRoot, '');
          });
        }

        output = _.union(output, files);
      });
    }
  }

  return output;
};

module.exports.getJavaScriptAssets = function(includeTests) {
  var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'app/');

  if (includeTests) {
    output = _.union(output, this.getGlobbedFiles(this.assets.tests));
  }

  return output;
};

module.exports.getCSSAssets = function() {
  var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'app/');
  return output;
};
