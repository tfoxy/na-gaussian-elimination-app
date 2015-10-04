import MatrixTableController from './matrixTable.controller';

let template = `
<table class="matrix-table">
  <tr ng-repeat="row in vm.matrix" ng-init="rowScope = this">
    <td ng-repeat="cell in row">
      <input ng-model="cell.value"
             name="{{vm.inputNamePrefix + '_' + rowScope.$index + ',' + $index}}"
             ng-keydown="vm.keyListener($event, this)"
             class="form-control input-sm"
             ui-validate="{invalidValid: 'vm.isValueValid($value)'}"
             pu-elastic-input>
    </td>
  </tr>
</table>
`;

function matrixTableDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    template: template,
    scope: {
      'matrix': '=bind',
      'inputNamePrefix': '@',
      'valueParser': '='
    },
    controller: MatrixTableController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

export default matrixTableDirective;
