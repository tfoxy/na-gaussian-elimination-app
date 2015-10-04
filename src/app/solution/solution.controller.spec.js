import indexModule from '../index.module.js';
import matrixUtilMock from '../matrixUtil/matrixUtil.mock.js';

describe(indexModule.name + '.SolutionController', () => {
  let scope, controller, gaussianElimination;

  beforeEach(angular.mock.module(indexModule.name));

  beforeEach(angular.mock.module(($provide) => {
    $provide.constant('MatrixUtil', matrixUtilMock);
  }));

  beforeEach(inject(($rootScope, $controller) => {
    scope = $rootScope.$new();
    controller = $controller('SolutionController', {$scope: scope});
  }));

  beforeEach(inject((_gaussianElimination_) => {
    gaussianElimination = _gaussianElimination_;
  }));

  it('starts with an empty solution', () => {
    expect(controller.latexSolution).to.have.length(0);
  });

  it('clears the view when solving starts', () => {
    controller.latexSolution = '123';
    gaussianElimination.emit('solveStart');
    expect(controller.latexSolution).to.have.length(0);
  });

  it('shows solution when solving ends', () => {
    let solution = [1, 2, 3];
    gaussianElimination.emit('solveEnd', {solution});
    expect(controller.latexSolution).to.equal('x = [[1], [2], [3]]');
  });

  it('sets a flag to indicate infinite solutions', () => {
    let solution = [1, 2, 3];
    let infiniteSolutions = true;
    gaussianElimination.emit('solveEnd', {solution, infiniteSolutions});
    expect(controller.infiniteSolutions).to.equal(true);
  });

  it('sets an error', () => {
    let error = new Error();
    gaussianElimination.emit('error', error);
    expect(controller.solutionError).to.equal(error);
  });

  it('unsets the error when solving starts', () => {
    controller.solutionError = new Error();
    gaussianElimination.emit('solveStart');
    expect(controller.solutionError).to.equal(null);
  });

});
