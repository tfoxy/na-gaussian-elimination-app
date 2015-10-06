'use strict';

/* global require exports process */
/* eslint no-var: 0 */

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;

var config = {
  // The address of a running selenium server.
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  // seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      // When using travis, --no-sandbox arg is pushed to args
      args: []
    }
  },

  baseUrl: 'http://localhost:3000',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: [paths.e2e + '/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};

if (process.env.TRAVIS) {
  config.capabilities.chromeOptions.args.push('--no-sandbox');
}

// An example configuration file.
exports.config = config;
