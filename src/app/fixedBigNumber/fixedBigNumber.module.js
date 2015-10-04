import bigNumberModule from '../3rdParty/bigNumber.module.js';
import fixedBigNumberFactory from './fixedBigNumber.factory.js';

let module = angular.module('naGaussianEliminationApp.fixedBigNumber', [
  bigNumberModule.name
])
  .factory('createFixedBigNumberClass', fixedBigNumberFactory);

export default module;
