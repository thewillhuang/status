'use strict';
var dest = './build';
var src = './app';
var gulp = './gulp';
var compression = require('compression');
var neat = require('node-neat').includePaths;

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest,
      middleware: [compression()]
      // proxy: 'localhost:3000',  // local node app address
      // port: 4004  // use *different* port than above
    }
  },
  sass: {
    src: src + '/css/*.{sass,scss}',
    dest: dest,
    settings: {
      sourcemap: true,
      sourceComments: 'map',
      imagePath: '/img', // Used by the image-url helper
      includePaths: ['styles'].concat(neat)
    },
    sourcemap: {
      loadMaps: true
    }
  },
  copy: {
    src: [src + '/**/*', '!' + src + '/{img,img/**/*}', '!' + src + '/{js,js/**/*}', '!' + src + '/{css,css/**/*}'], // '!' must be a string
    dest: dest
  },
  gulp: {
    src: gulp + '/**/*'
  },
  images: {
    src: src + '/img/**/*',
    dest: dest + '/img/'
  },
  markup: {
    src: src + '/**/*.html',
    dest: dest
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
      entries: src + '/js/status.js',
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
    jsSrc: dest + '/*.js',
    dest: dest,
    cssOpt: {
      keepSpecialComments: 0
    }
  },
  minifyHtml: {
    opts: {spare:true},
    src: dest + '/*.html',
    dest: dest
  },
  nodemon: {
    script: 'server.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ],
    ext: 'js html',
    env: { NODE_ENV: 'development' }
  }
};
