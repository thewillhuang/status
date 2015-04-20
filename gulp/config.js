'use strict';
var dest = '../public';
var src = '../app';
var gulp = './gulp';
var neat = require('node-neat').includePaths;
var compression = require('compression');

module.exports = {
  browserSync: {
    proxy: 'http://localhost:3000',
    port: 4004,  // use *different* port than above
  },
  sass: {
    src: src + '/css/**/*.{sass,scss}',
    dest: dest,
    settings: {
      sourcemap: true,
      sourceComments: 'map',
      imagePath: '/images', // Used by the imlpage-url helper
      includePaths: ['styles'].concat(neat)
    },
    sourcemap: {
      loadMaps: true
    }
  },
  copy: {
    src: [
      src + '/**/*',
      '!' + src + '/images/**/*',
      '!' + src + '/css/**/*.{sass,scss}',
      '!' + src + '/**/*.html'
    ], // '!' must be a string
    // '!' + src + '/{js,js/**/*}',
    //'!' + src + '/{plugins,plugins/**/*}',
    dest: dest,
    base: {base: src}
  },
  changed: {
    src: src
  },
  gulp: {
    src: gulp + '/**/*'
  },
  images: {
    src: src + '/images/**/*',
    dest: dest + '/images/'
  },
  markup: {
    src: src + '/**/*.html',
    dest: dest
  },
  nodemon:{
    // nodemon our expressjs server
    script: '../server.js',
    // watch core server file(s) that require server restart on change
    watch: ['../server.js'],
    env: { 'NODE_ENV': 'development' }
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [
      // {
      //   entries: src + '/javascript/global.coffee',
      //   dest: dest,
      //   outputName: 'global.js',
      //   // Additional file extentions to make optional
      //   extensions: ['.coffee', '.hbs'],
      //   // list of modules to make require-able externally
      //   require: ['jquery', 'underscore']
      // },
      // {
      //   entries: src + '/javascript/page.js',
      //   dest: dest,
      //   outputName: 'page.js'
      //   // list of externally available modules to exclude from the bundle
      //   // external: ['jquery', 'underscore']
      // },
      {
        entries: src + '/js/status.jsx',
        dest: dest,
        outputName: 'status.js'
      },
      {
        entries: src + '/js/site.js',
        dest: dest,
        outputName: 'site.js'
      }]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: [
      dest + '/*.js'
      // dest + '/js/**/*.js',
      // '!' + dest + '/js/components/**/*',
      // '!' + dest + '/js/test/**/*',
      // '!' + dest + '/js/vendor/**/*',
      // '!' + dest + '/js/cors/**/*',
      // '!' + dest + '/plugins/**/*.js'
      ],
    dest: dest,
    cssOpt: {
      keepSpecialComments: 0
    }
  },
  minifyHtml: {
    opts: {
      spare: true
    },
    src: dest + '**/*.html',
    dest: dest
  }
};
