function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('gaussianElimination', {
      url: '/',
      views: {
        'input': {
          templateUrl: 'app/input/input.html',
          controller: 'InputController',
          controllerAs: 'inputCtrl'
        },
        'solution': {
          templateUrl: 'app/solution/solution.html',
          controller: 'SolutionController',
          controllerAs: 'solutionCtrl'
        },
        'steps': {
          templateUrl: 'app/steps/steps.html',
          controller: 'StepsController',
          controllerAs: 'stepsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/');
}

export default routerConfig;
