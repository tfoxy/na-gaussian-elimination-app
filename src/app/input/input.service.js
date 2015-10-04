class Input {

  constructor(numbers, MatrixUtil, gaussianElimination, BigNumber) {
    'ngInject';

    this._numbers = numbers;
    this._MatrixUtil = MatrixUtil;
    this._gaussianElimination = gaussianElimination;
    this._BigNumber = BigNumber;

    this.pivotingMethodNames = [
      'none',
      'avoid zero',
      'partial',
      'scaled',
      'complete'
    ];

    this.roundingModeNames = [
      'up',
      'down',
      'ceil',
      'floor',
      'half up',
      'half down',
      'half even',
      'half ceil',
      'half floor'
    ];

    this.defaultPrecision = 20;

    this.form = {
      pivoting: 'partial',
      luFlag: false,
      numberType: 'fraction',
      precision: null,
      roundingMode: 'half up'
    };
  }

  solve(augmentedMatrix) {
    let matrices = this._MatrixUtil.splitColumns(augmentedMatrix, -1);

    let matrix = matrices[0];
    let result = this._MatrixUtil.transpose(matrices[1])[0];

    this._gaussianElimination.solve(matrix, result);
  }

  numberTypeChanged() {
    let roundingMode = this._getRoundingMode();
    let precision = this.form.precision || this.defaultPrecision;
    this._numbers.changeType(this.form.numberType, precision, roundingMode);
  }

  pivotingChanged() {
    this._gaussianElimination.setPivoting(this.form.pivoting);
  }

  luFlagChanged() {
    this._gaussianElimination.setLuFlag(this.form.luFlag);
  }

  _getRoundingMode() {
    let displayName = this.form.roundingMode;
    let name = 'ROUND_' + displayName.toUpperCase().replace(' ', '_');
    return this._BigNumber[name];
  }

}

export default Input;
