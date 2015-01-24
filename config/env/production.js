'use strict';

module.exports = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean',
    options: {
      user: '',
      pass: ''
    }
  },
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
    css: 'build/app.css',
    js: 'build/bundle.js'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  }
};
