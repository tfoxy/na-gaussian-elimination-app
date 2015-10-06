import key from './keys';

class MatrixTableController {

  static defaultValueParser(inputValue) {
    return inputValue;
  }

  constructor($element, $timeout) {
    'ngInject';

    this.$element = $element;
    this.$timeout = $timeout;

    this.valueParser = this.valueParser || MatrixTableController.defaultValueParser;
    this.inputNamePrefix = this.inputNamePrefix || 'matrix-table';
  }

  keyListener($event, scope) {
    let element = $event.target;
    let preventDefault = false;

    if ($event.ctrlKey || $event.shiftKey || $event.altKey || $event.metaKey) {
      return;
    }

    switch ($event.keyCode) {
      case key.BACKSPACE:
      case key.LEFT:
        if (MatrixTableController._hasCaretAtStart(element)) {
          this._focusRelativeInput(scope, 0, -1);
          preventDefault = true;
        }
        break;
      case key.UP:
        this._focusRelativeInput(scope, -1, 0);
        preventDefault = true;
        break;
      case key.SPACE:
      case key.RIGHT:
        if (MatrixTableController._hasCaretAtEnd(element)) {
          if (this._isLastColumn(scope)) {
            this.addColumn();
            this.$timeout(() => {
              this._focusRelativeInput(scope, 0, 1);
            });
          } else {
            this._focusRelativeInput(scope, 0, 1);
          }
          preventDefault = true;
        }
        break;
      case key.DOWN:
        if (this._isLastRow(scope)) {
          this.addRow();
          this.$timeout(() => {
            this._focusRelativeInput(scope, 1, 0);
          });
        } else {
          this._focusRelativeInput(scope, 1, 0);
        }
        preventDefault = true;
        break;
      case key.ENTER:
        if (this._isLastRow(scope)) {
          this.addRow();
          this.$timeout(() => {
            this._focusNextRowFirstInput(scope);
          });
        } else {
          this._focusNextRowFirstInput(scope);
        }
        preventDefault = true;
    }

    if (preventDefault) {
      $event.preventDefault();
    }
  }

  addColumn() {
    this.matrix.forEach(row => {
      row.push({value: ''});
    });
  }

  addRow() {
    let rowLength = this.matrix.length > 0 ? this.matrix[0].length : 0;
    let row = [];
    for (let i = 0; i < rowLength; i++) {
      row.push({value: ''});
    }
    this.matrix.push(row);
  }

  popColumn() {
    this.matrix.forEach(row => {
      row.pop();
    });
  }

  popRow() {
    this.matrix.pop();
  }

  isValueValid(inputValue) {
    try {
      this.valueParser(inputValue);
      return true;
    } catch (err) {
      return false;
    }
  }

  _focusRelativeInput(scope, rowDiff, columnDiff) {
    let rowIndex = scope.rowScope.$index + rowDiff;
    let columnIndex = scope.$index + columnDiff;

    let row = this.$element.find('tr').eq(rowIndex);
    let input = row.find('input').eq(columnIndex);

    input[0].focus();
  }

  _focusNextRowFirstInput(scope) {
    let rowIndex = scope.rowScope.$index + 1;
    let row = this.$element.find('tr').eq(rowIndex);
    let input = row.find('input').eq(0);

    input[0].focus();
  }

  static _hasCaretAtStart(element) {
    let caretPosition = element.selectionStart;

    return caretPosition === element.selectionEnd &&
      caretPosition === 0;
  }

  static _hasCaretAtEnd(element) {
    let caretPosition = element.selectionStart;

    return caretPosition === element.selectionEnd &&
        caretPosition === element.value.length;
  }

  _isLastColumn(scope) {
    let index = scope.$index;
    let matrixRow = this.matrix[0];

    return index === matrixRow.length - 1;
  }

  _isLastRow(scope) {
    let index = scope.rowScope.$index;
    return index === this.matrix.length - 1;
  }
}

export default MatrixTableController;
