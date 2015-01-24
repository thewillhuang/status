'use strict';

module.exports = {
  app: {
    title: 'Bed Census',
    description: 'Prototype',
    keywords: 'whiteboard'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'JOE',
  sessionCollection: 'sessions',
  sessionCookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null,
    // domain: 'ourdomain.com'
  },
  sessionName: 'connect.sid',
  log: {
    format: 'combined',
    options: {
      stream: 'access.log'
    }
  },
  assets: {
    lib: {
      css: [
      ],
      js: [
      ]
    },
    css: [
      'build/css/*.sass'
    ],
    js: [
      'build/js/*.js',
    ],
    tests: [
    ]
  }
};
