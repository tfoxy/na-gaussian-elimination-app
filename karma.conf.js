'use strict';

/* jshint node: true */

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

function listFiles() {
  var wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });

  return ['./node_modules/phantomjs-polyfill/bind-polyfill.js']
    .concat(wiredep(wiredepOptions).js)
    .concat([
      path.join(conf.paths.tmp, '/serve/app/index.module.js'),
      path.join(conf.paths.src, '/**/*.html')
    ]);
}

module.exports = function(config) {

  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    ngHtml2JsPreprocessor: {
      stripPrefix: conf.paths.src + '/',
      moduleName: 'naGaussianEliminationApp'
    },

    logLevel: 'WARN',

    frameworks: [
      'mocha',
      'chai-sinon'
    ],

    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai-sinon',
      'karma-ng-html2js-preprocessor'
    ],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    reporters: ['mocha', 'coverage']
  };

  var preprocessors = {};
  var pathSrcHtml = path.join(conf.paths.src, '/**/*.html');
  preprocessors[pathSrcHtml] = ['ng-html2js'];

  var pathTmpJs = path.join(conf.paths.tmp, '/serve/app/index.module.js');

  preprocessors[pathTmpJs] = ['coverage'];

  configuration.preprocessors = preprocessors;

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if (configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
