class SolutionController {
  constructor(gaussianElimination, MatrixUtil) {
    'ngInject';

    this._MatrixUtil = MatrixUtil;

    this.clear();

    gaussianElimination.on('solveStart', this.clear.bind(this));
    gaussianElimination.on('solveEnd', this.setSolution.bind(this));
    gaussianElimination.on('error', this.setError.bind(this));
  }

  clear() {
    this.latexSolution = '';
    this.infiniteSolutions = false;
    this.solutionError = null;
  }

  setSolution(system) {
    let latexSolution = new this._MatrixUtil([system.solution]).transpose().toLatex();
    this.latexSolution = `x = ${latexSolution}`;
    this.infiniteSolutions = system.infiniteSolutions;
  }

  setError(error) {
    this.solutionError = error;
  }
}

export default SolutionController;
