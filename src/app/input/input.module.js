import matrixInputModule from '../components/matrixInput/matrixInput.module.js';
import matrixUtilModule from '../matrixUtil/matrixUtil.module.js';
import gaussianEliminationModule from '../gaussianElimination/gaussianElimination.module.js';
import numbersModule from '../numbers/numbers.module.js';

import InputController from './input.controller.js';
import Input from './input.service.js';

let module = angular.module('naGaussianEliminationApp.input', [
  'ui.validate',
  'puElasticInput',

  matrixInputModule.name,
  matrixUtilModule.name,
  gaussianEliminationModule.name,
  numbersModule.name
])
  .controller(InputController.name, InputController)
  .service('inputData', Input);

export default module;
