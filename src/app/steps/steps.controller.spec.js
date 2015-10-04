import indexModule from '../index.module.js';
import matrixUtilMock from '../matrixUtil/matrixUtil.mock.js';

describe(indexModule.name + '.StepsController', () => {
  let scope, controller, gaussianElimination;

  beforeEach(angular.mock.module(indexModule.name));

  beforeEach(angular.mock.module(($provide) => {
    $provide.constant('MatrixUtil', matrixUtilMock);
  }));

  beforeEach(inject(($rootScope, $controller) => {
    scope = $rootScope.$new();
    controller = $controller('StepsController', {$scope: scope});
  }));

  beforeEach(inject((_gaussianElimination_) => {
    gaussianElimination = _gaussianElimination_;
  }));

  it('shows system as augmented matrix at the start', () => {
    let system = {
      matrix: [[1, 2], [3, 4]],
      result: [5, 6]
    };
    gaussianElimination.emit('solveStart', system);
    expect(controller).to.have.deep.property('steps[0].matrixLatex', '[[1, 2], [3, 4] | [5], [6]]');
  });

  it('shows elimination step with the "m" value and indexes', () => {
    let system = {
      matrix: [[1, 2, 3], [3, 4, 5], [5, 6, 7]],
      result: [5, 6, 7]
    };
    gaussianElimination.emit('solveStart', system);
    gaussianElimination.emit('eliminationReduceRowEnd', {
      i: 2,
      k: 1,
      m: 1.5
    });
    let eq = 'm_{3,2} = \\frac{a_{3,2}}{a_{2,2}} = 1.5';
    expect(controller).to.have.deep.property('steps[1].mCoefficientEquation', eq);
  });

  it('shows substitution step with its value and indexes', () => {
    let system = {
      matrix: [[1, 2], [0, 3]],
      result: [7, 15]
    };
    gaussianElimination.emit('solveStart', system);

    gaussianElimination.emit('substitutionOperationEnd', {
      i: 1,
      value: 5
    });
    let eq1 = 'x_{2} = \\frac{b_{2}}{a_{2,2}} = 5';
    expect(controller).to.have.deep.property('steps[1].equation', eq1);

    gaussianElimination.emit('substitutionOperationEnd', {
      i: 0,
      value: -3
    });
    let eq2 = 'x_{1} = \\frac{b_{1} - a_{1,2} \\cdot x_{2}}{a_{1,1}} = -3';
    expect(controller).to.have.deep.property('steps[2].equation', eq2);
  });

  it('shows swapRows step with its indexes', () => {
    let system = {
      matrix: [[1, 2], [0, 3]],
      result: [7, 15]
    };
    gaussianElimination.emit('solveStart', system);

    gaussianElimination.emit('swapRows', {
      i: 0,
      j: 1
    });

    expect(controller).to.have.deep.property('steps[1]');

    let step = controller.steps[1];

    expect(step).to.have.property('i', 0);
    expect(step).to.have.property('j', 1);
  });

  it('shows swapColumns step with its indexes', () => {
    let system = {
      matrix: [[4, 3], [2, 1]],
      result: [5, 6]
    };
    gaussianElimination.emit('solveStart', system);

    gaussianElimination.emit('swapColumns', {
      i: 0,
      j: 1,
      transformationVector: [1, 0]
    });

    expect(controller).to.have.deep.property('steps[1]');

    let step = controller.steps[1];

    expect(step).to.have.property('i', 0);
    expect(step).to.have.property('j', 1);
  });

  it('shows swapColumns step with its matrix', () => {
    let system = {
      matrix: [[4, 3], [2, 1]],
      result: [5, 6]
    };
    gaussianElimination.emit('solveStart', system);

    gaussianElimination.emit('swapColumns', {
      i: 0,
      j: 1,
      transformationVector: [1, 0]
    });

    let matrix = '[[4, 3], [2, 1]]';
    expect(controller).to.have.deep.property('steps[1].matrixLatex', matrix);
  });

  it('shows swapColumns step with its solution indexes', () => {
    let system = {
      matrix: [[4, 3], [2, 1]],
      result: [5, 6]
    };
    gaussianElimination.emit('solveStart', system);

    gaussianElimination.emit('swapColumns', {
      i: 0,
      j: 1,
      transformationVector: [1, 0]
    });

    let solution = '[[x_{2}], [x_{1}]]';
    expect(controller).to.have.deep.property('steps[1].solutionLatex', solution);
  });

  it('shows substitution step with an asterisk and real index to indicate swapped columns', () => {
    let system = {
      matrix: [[1, 2], [0, 3]],
      result: [7, 15]
    };
    gaussianElimination.emit('solveStart', system);

    gaussianElimination.emit('swapColumns', {
      i: 0,
      j: 1,
      transformationVector: [1, 0]
    });

    gaussianElimination.emit('substitutionOperationEnd', {
      i: 1,
      value: 5
    });
    let eq1 = 'x_{1} = x_{2}^* = \\frac{b_{2}}{a_{2,2}} = 5';
    expect(controller).to.have.deep.property('steps[2].equation', eq1);

    gaussianElimination.emit('substitutionOperationEnd', {
      i: 0,
      value: -3
    });
    let eq2 = 'x_{2} = x_{1}^* = \\frac{b_{1} - a_{1,2} \\cdot x_{2}^*}{a_{1,1}} = -3';
    expect(controller).to.have.deep.property('steps[3].equation', eq2);
  });

});
