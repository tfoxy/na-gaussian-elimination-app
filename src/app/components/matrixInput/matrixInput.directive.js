import MatrixInputController from './matrixInput.controller';

let template = `
<matrix-table bind="vm.tableMatrix"
              ng-if="vm.showCells"
              input-name-prefix="{{vm.inputNamePrefix}}"
              value-parser="vm.valueParser"
              class="form-group form-inline"
              ></matrix-table>
<div ng-if="!vm.showCells" class="form-group form-inline matrix-table">
  <textarea ng-model="vm.matrixText" msd-elastic class="form-control"></textarea>
</div>
<div class="form-group form-inline">
  <div class="btn-group">
    <button type="button"
            ng-click="vm.toggleCells()"
            name="{{vm.inputNamePrefix}}ToggleCellsButton"
            class="btn btn-default btn-sm"
            ng-class="{active: vm.showCells}"
            >cells</button>
    <button type="button" name="{{vm.inputNamePrefix}}ClearButton"
        ng-click="vm.clear()" class="btn btn-default btn-sm">clear</button>
    <button type="button" name="{{vm.inputNamePrefix}}IncreaseButton"
        ng-click="vm.increaseMatrix()" class="btn btn-default btn-sm">+</button>
    <button type="button" name="{{vm.inputNamePrefix}}DecreaseButton"
        ng-click="vm.decreaseMatrix()" class="btn btn-default btn-sm">-</button>
  </div>
</div>
`;

function matrixTableDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    template: template,
    scope: {
      'ctrl': '=',
      'showCells': '=cells',
      'tableMatrix': '=initialMatrix',
      'defaultMatrixSize': '=',
      'inputNamePrefix': '@',
      'valueParser': '='
    },
    controller: MatrixInputController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

export default matrixTableDirective;
