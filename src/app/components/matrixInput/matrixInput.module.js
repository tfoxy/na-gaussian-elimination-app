import matrixInputDirective from './matrixInput.directive';
import matrixTableModule from '../matrixTable/matrixTable.module';

let component = angular.module('matrixInputComponent', [
  'monospaced.elastic',

  matrixTableModule.name
])
  .directive('matrixInput', matrixInputDirective);

export default component;
