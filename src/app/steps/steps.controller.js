class StepsController {
  constructor(gaussianElimination, MatrixUtil) {
    'ngInject';

    this._MatrixUtil = MatrixUtil;

    this._clear();

    gaussianElimination.on('solveStart', this._solveStartListener.bind(this));
    gaussianElimination.on('eliminationReduceRowEnd', this._eliminationStepListener.bind(this));
    gaussianElimination.on('swapRows', this._swapRowsListener.bind(this));
    gaussianElimination.on('swapColumns', this._swapColumnsListener.bind(this));
    gaussianElimination.on('substitutionOperationEnd', this._substitutionStepListener.bind(this));
    gaussianElimination.on('substitutionEnd', this._clearAuxProperties.bind(this));
    gaussianElimination.on('error', this._clearAuxProperties.bind(this));
  }

  _clear() {
    this.steps = [];
    this._clearAuxProperties();
  }

  _clearAuxProperties() {
    this.system = null;
    this.transformationVector = null;
    this.swappedColumns = false;
  }

  _solveStartListener(system) {
    this._clear();
    this.system = system;
    let matrixLatex = this._getAugmentedMatrixLatex(this.system);
    this.steps.push({
      type: 'matrix',
      matrixLatex
    });
  }

  _eliminationStepListener(ev) {
    // m_{i,k} = \frac{a_{i,k}}{a_{k,k}} = $m
    let i = ev.i + 1, k = ev.k + 1;
    let m = ev.m.toString();
    let mCoefficientEquation =
      `m_{${i},${k}} = \\frac{a_{${i},${k}}}{a_{${k},${k}}} = ${m}`;
    let matrixLatex = this._getAugmentedMatrixLatex(this.system);

    this.steps.push({
      type: 'elimination',
      mCoefficientEquation,
      matrixLatex
    });
  }

  _substitutionStepListener(ev) {
    // x_{i} = \\frac{b_{i} - a_{i,j} \\cdot x_{j} - ...}{a_{i,i}} = $value
    let i = ev.i + 1;
    let value = ev.value.toString();
    let asterisk = this.swappedColumns ? '^*' : '';
    let prefix = this.swappedColumns ? `x_{${this.transformationVector[ev.i] + 1}} = ` : '';

    let sumEquationArray = [];
    for (let j = i; j < this.system.matrix[0].length; j++) {
      let _j = j + 1;
      // ' - a_{i,j} \\cdot x_{j}'
      sumEquationArray.push(` - a_{${i},${_j}} \\cdot x_{${_j}}${asterisk}`);
    }
    let sumEquation = sumEquationArray.join('');

    let equation =
      `${prefix}x_{${i}}${asterisk} = \\frac{b_{${i}}${sumEquation}}{a_{${i},${i}}} = ${value}`;

    this.steps.push({
      type: 'equation',
      equation
    });
  }

  _swapRowsListener(ev) {
    let matrixLatex = this._getAugmentedMatrixLatex(this.system);

    this.steps.push({
      type: 'swapRows',
      i: ev.i,
      j: ev.j,
      matrixLatex
    });
  }

  _swapColumnsListener(ev) {
    let matrixLatex = this._MatrixUtil.toLatex(this.system.matrix);
    let transformationVector = ev.transformationVector.map(n => `x_{${n + 1}}`);
    let solutionLatex = new this._MatrixUtil([transformationVector]).transpose().toLatex();

    this.swappedColumns = true;
    this.transformationVector = ev.transformationVector;

    this.steps.push({
      type: 'swapColumns',
      i: ev.i,
      j: ev.j,
      matrixLatex,
      solutionLatex
    });
  }

  _getAugmentedMatrixLatex(system) {
    let result = this._MatrixUtil.transpose([system.result]);
    let augmentedMatrixLatex = this._MatrixUtil.toLatex(system.matrix, result);
    return augmentedMatrixLatex;
  }
}

export default StepsController;
