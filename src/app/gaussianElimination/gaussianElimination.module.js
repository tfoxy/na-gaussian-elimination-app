import GaussianEliminationModule from '../3rdParty/naGaussianElimination.module.js';
import GaussianEliminationFactory from './gaussianElimination.factory.js';

let component = angular.module('naGaussianEliminationApp.gaussianElimination', [
  GaussianEliminationModule.name
])
  .factory('gaussianElimination', GaussianEliminationFactory);

export default component;
