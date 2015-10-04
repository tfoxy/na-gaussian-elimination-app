/* global GaussianElimination, EventEmitter2 */

GaussianElimination.setEventEmitter(EventEmitter2);

export default angular.module('naGaussianElimination', [])
  .constant('GaussianElimination', GaussianElimination);
