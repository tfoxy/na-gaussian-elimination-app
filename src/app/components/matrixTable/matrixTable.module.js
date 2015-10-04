import matrixTableDirective from './matrixTable.directive';

let component = angular.module('matrixTableComponent', [
  'puElasticInput'
])
  .directive('matrixTable', matrixTableDirective);

export default component;
