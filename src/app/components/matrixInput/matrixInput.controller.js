const DEFAULT_SIZE = 3;

class MatrixTableController {

  constructor($element) {
    'ngInject';

    this.$element = $element;

    this.ctrl = this;

    this.activate();
  }

  activate() {
    if (angular.isUndefined(this.showCells)) {
      this.showCells = true;
    }
    if (!this.tableMatrix) {
      this.tableMatrix = this.initializeEmptyMatrix();
    }
    this.matrixText = null;
    if (!this.valueParser) {
      this.valueParser = value => +value;
    }

    if (this.showCells) {
      this.activateCellsMode();
    } else {
      this.changeToTextareaMode();
    }
  }

  initializeEmptyMatrix() {
    const size = this.defaultMatrixSize;
    const m = size ? size[0] || size : DEFAULT_SIZE;
    const n = size ? size[1] || size : DEFAULT_SIZE;
    const matrix = [];

    for (let i = 0; i < m; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        row.push({value: ''});
      }
      matrix.push(row);
    }
    return matrix;
  }

  toggleCells() {
    if (this.showCells) {
      this.changeToTextareaMode();
    } else {
      this.changeToCellsMode();
    }
  }

  activateCellsMode() {
    this.clear = this.clearCells;
    this.increaseMatrix = this.increaseCells;
    this.decreaseMatrix = this.decreaseCells;
    this.getMatrix = this.getMatrixFromCells;
  }

  activateTextareaMode() {
    this.clear = this.clearTextarea;
    this.increaseMatrix = angular.noop;
    this.decreaseMatrix = angular.noop;
    this.getMatrix = this.getMatrixFromTextarea;
  }

  changeToCellsMode() {
    this.showCells = true;
    this.tableMatrix = this.transformFromTextareaToCells();
    this.matrixText = null;
    this.activateCellsMode();
  }

  changeToTextareaMode() {
    this.showCells = false;
    this.matrixText = this.transformFromCellsToTextarea();
    this.tableMatrix = null;
    this.activateTextareaMode();
  }

  transformFromTextareaToCells() {
    if (this.matrixText === '') {
      return this.initializeEmptyMatrix();
    }

    return this.matrixText.split('\n')
      .map(row => row.split(/\s*,\s*|\s+/).map(value => ({value})));
  }

  transformFromCellsToTextarea() {
    return this.tableMatrix.map(row => row.map(cell => cell.value).join(', ')).join('\n');
  }

  clearCells() {
    this.tableMatrix = this.initializeEmptyMatrix();
  }

  clearTextarea() {
    this.matrixText = '';
  }

  _getMatrixTableCtrl() {
    return this.$element.find('matrix-table').controller('matrixTable');
  }

  increaseCells() {
    let matrixTableCtrl = this._getMatrixTableCtrl();

    matrixTableCtrl.addRow();
    matrixTableCtrl.addColumn();
  }

  decreaseCells() {
    let matrixTableCtrl = this._getMatrixTableCtrl();

    matrixTableCtrl.popRow();
    matrixTableCtrl.popColumn();
  }

  getMatrixFromCells() {
    return this.toPlainMatrix(this.tableMatrix);
  }

  getMatrixFromTextarea() {
    let tableMatrix = this.transformFromTextareaToCells();
    return this.toPlainMatrix(tableMatrix);
  }

  toPlainMatrix(matrix) {
    return matrix.map(row => row.map(cell => this.valueParser(cell.value)));
  }

}

export default MatrixTableController;
