import matrixInputModule from './matrixInput.module';

describe('matrixInput', () => {
  let scope, compileAndDigest, bodyElements;

  beforeEach(angular.mock.module(matrixInputModule.name));

  beforeEach(inject(($rootScope, $compile, $document) => {
    bodyElements = [];
    scope = $rootScope.$new();
    compileAndDigest = (html) => {
      let element = angular.element(html);
      $document[0].body.appendChild(element[0]);
      $compile(element)(scope);
      scope.$digest();

      return element;
    };
  }));

  afterEach(() => {
    bodyElements.forEach(el => {
      el.parentNode.removeChild(el);
    });
  });

  describe('directive', () => {

    it('is correctly initialized', () => {
      let t = '<matrix-input></matrix-input>';
      let element = compileAndDigest(t);
      expect(element[0].tagName).to.equal('MATRIX-INPUT');
    });

    describe('cells attribute', () => {

      it('shows the textarea when set to false', () => {
        let t = '<matrix-input cells="::false"></matrix-input>';
        let element = compileAndDigest(t);

        expect(element.find('textarea')).to.have.length(1);
      });

    });

    describe('cells button', () => {

      it('toggles the matrix input mode from cells to textarea', () => {
        let t = '<matrix-input ctrl="ctrl"></matrix-input>';
        let element = compileAndDigest(t);

        scope.ctrl.toggleCells();
        scope.$digest();

        expect(element.find('matrix-table')).to.have.length(0, 'matrix-table');
        expect(element.find('textarea')).to.have.length(1, 'textarea');
      });

      it('toggles the matrix input mode from cells to textarea and back again', () => {
        let t = '<matrix-input ctrl="ctrl"></matrix-input>';
        let element = compileAndDigest(t);

        scope.ctrl.toggleCells();
        scope.$digest();

        scope.ctrl.toggleCells();
        scope.$digest();

        expect(element.find('matrix-table')).to.have.length(1, 'matrix-table');
        expect(element.find('textarea')).to.have.length(0, 'textarea');
      });

    });

    describe('clear button', () => {

      it('clears all the cells and sets the size to the default', () => {
        let t = '<matrix-input ctrl="ctrl"></matrix-input>';
        let element = compileAndDigest(t);

        scope.ctrl.tableMatrix[0][0].value = '123';
        scope.ctrl.tableMatrix[1][1].value = '234';
        scope.$digest();

        scope.ctrl.clear();
        scope.$digest();

        expect(scope.ctrl.tableMatrix[0][0].value).to.equal('', 'matrix[0][0]');
        expect(scope.ctrl.tableMatrix[1][1].value).to.equal('', 'matrix[0][0]');
        expect(element.find('matrix-table').find('tr').eq(0).find('input').eq(0).val()).to.equal('', 'input[0][0]');
        expect(element.find('matrix-table').find('tr').eq(1).find('input').eq(1).val()).to.equal('', 'input[1][1]');
      });

      it('clears the textarea', () => {
        let t = '<matrix-input ctrl="ctrl" cells="::false"></matrix-input>';
        let element = compileAndDigest(t);

        scope.ctrl.matrixText = '123';
        scope.$digest();

        scope.ctrl.clear();
        scope.$digest();

        expect(scope.ctrl.matrixText).to.equal('', 'controller value');
        expect(element.find('textarea').val()).to.equal('', 'textarea value');
      });

    });

    describe('increase button', () => {

      it('adds a column', () => {
        let t = '<matrix-input ctrl="ctrl"></matrix-input>';
        compileAndDigest(t);

        let initialLength = scope.ctrl.tableMatrix[0].length;

        scope.ctrl.increaseMatrix();

        expect(scope.ctrl.tableMatrix[0].length).to.equal(initialLength + 1);
      });

      it('adds a row', () => {
        let t = '<matrix-input ctrl="ctrl"></matrix-input>';
        compileAndDigest(t);

        let initialLength = scope.ctrl.tableMatrix.length;

        scope.ctrl.increaseMatrix();

        expect(scope.ctrl.tableMatrix.length).to.equal(initialLength + 1);
      });

    });

    describe('decrease button', () => {

      it('pops a column', () => {
        let t = '<matrix-input ctrl="ctrl"></matrix-input>';
        compileAndDigest(t);

        let initialLength = scope.ctrl.tableMatrix.length;

        scope.ctrl.decreaseMatrix();

        expect(scope.ctrl.tableMatrix.length).to.equal(initialLength - 1);
      });

      it('pops a row', () => {
        let t = '<matrix-input ctrl="ctrl"></matrix-input>';
        compileAndDigest(t);

        let initialLength = scope.ctrl.tableMatrix.length;

        scope.ctrl.decreaseMatrix();

        expect(scope.ctrl.tableMatrix.length).to.equal(initialLength - 1);
      });

    });

    describe('defaultMatrixSize attribute', () => {

      it('accepts a number to initialize the matrix with the given size', () => {
        let t = '<matrix-input ctrl="ctrl" default-matrix-size="7"></matrix-input>';
        compileAndDigest(t);

        expect(scope.ctrl.tableMatrix).to.have.length(7);
        expect(scope.ctrl.tableMatrix[0]).to.have.length(7);
      });

      it('accepts an array to initialize the matrix with a width and height', () => {
        let t = '<matrix-input ctrl="ctrl" default-matrix-size="[7, 9]"></matrix-input>';
        compileAndDigest(t);

        expect(scope.ctrl.tableMatrix).to.have.length(7);
        expect(scope.ctrl.tableMatrix[0]).to.have.length(9);
      });

      it('is used when converting from textarea to cells, where textarea is empty', () => {
        let t = '<matrix-input ctrl="ctrl" default-matrix-size="7" cells="false"></matrix-input>';
        compileAndDigest(t);

        scope.ctrl.matrixText = '';
        scope.ctrl.toggleCells();

        expect(scope.ctrl.tableMatrix).to.have.length(7);
      });

    });

  });

  describe('controller', () => {

    it('is initialized with the given initial matrix', () => {
      let m = scope.m = [[{value: '1'}, {value: '2'}], [{value: '3'}, {value: '4'}]];
      let t = '<matrix-input ctrl="ctrl" initial-matrix="::m"></matrix-input>';
      compileAndDigest(t);

      expect(scope.ctrl.tableMatrix).to.deep.equal(m);
    });

    describe('#getMatrix', () => {

      it('returns a new matrix, with the inputs converted to numbers', () => {
        scope.m = [[{value: '1'}, {value: '2'}], [{value: '3'}, {value: '4'}]];
        let t = '<matrix-input ctrl="ctrl" initial-matrix="::m"></matrix-input>';
        compileAndDigest(t);

        let matrix = scope.ctrl.getMatrix();

        expect(matrix).to.deep.equal([[1, 2], [3, 4]]);
      });

      it('returns a new matrix, with the values from valueParser', () => {
        scope.vp = val => +val + 1;
        scope.m = [[{value: '1'}, {value: '2'}], [{value: '3'}, {value: '4'}]];
        let t = '<matrix-input ctrl="ctrl" value-parser="vp" initial-matrix="::m"></matrix-input>';
        compileAndDigest(t);

        let matrix = scope.ctrl.getMatrix();

        expect(matrix).to.deep.equal([[2, 3], [4, 5]]);
      });

    });

  });

});
