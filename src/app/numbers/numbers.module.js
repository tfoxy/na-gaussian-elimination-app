import bigRationalModule from '../3rdParty/bigRational.module.js';
import fixedBigNumberModule from '../fixedBigNumber/fixedBigNumber.module.js';
import numbers from './numbers.service.js';

let module = angular.module('naGaussianEliminationApp.numbers', [
  bigRationalModule.name,
  fixedBigNumberModule.name
])
  .service('numbers', numbers);

export default module;
