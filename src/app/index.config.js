function config($logProvider, katexConfigProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  katexConfigProvider.defaultOptions.displayMode = true;
}

export default config;
