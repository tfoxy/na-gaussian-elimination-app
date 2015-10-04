import matrixUtilModule from './matrixUtil/matrixUtil.module.js';
import gaussianEliminationModule from './gaussianElimination/gaussianElimination.module.js';
import numbersModule from './numbers/numbers.module.js';

import config from './index.config.js';
import routerConfig from './index.route.js';

import MainController from './main/main.controller.js';
import inputModule from './input/input.module.js';
import SolutionController from './solution/solution.controller.js';
import StepsController from './steps/steps.controller.js';


let app = angular.module('naGaussianEliminationApp', [
  'ui.router',
  'katex',

  matrixUtilModule.name,
  gaussianEliminationModule.name,
  numbersModule.name,

  inputModule.name
])
  .config(config)
  .config(routerConfig)
  .controller(MainController.name, MainController)
  .controller(SolutionController.name, SolutionController)
  .controller(StepsController.name, StepsController);

export default app;
