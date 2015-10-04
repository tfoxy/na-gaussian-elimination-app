function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/',
      views: {
        '': {
          templateUrl: 'app/main/main.html',
          controller: 'MainController',
          controllerAs: 'mainCtrl'
        },
        'input@main': {
          templateUrl: 'app/input/input.html',
          controller: 'InputController',
          controllerAs: 'inputCtrl'
        },
        'solution@main': {
          templateUrl: 'app/solution/solution.html',
          controller: 'SolutionController',
          controllerAs: 'solutionCtrl'
        },
        'steps@main': {
          templateUrl: 'app/steps/steps.html',
          controller: 'StepsController',
          controllerAs: 'stepsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/');
}

export default routerConfig;
