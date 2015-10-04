import matrixTableModule from './matrixTable.module';
import key from './keys';

describe('matrixTable', () => {
  let scope, compileAndDigest, bodyElements;

  beforeEach(angular.mock.module(matrixTableModule.name));

  beforeEach(inject(($rootScope, $compile, $document) => {
    bodyElements = [];
    scope = $rootScope.$new();
    compileAndDigest = (html) => {
      let element = angular.element(html);
      // Append to body so that selection can be updated
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
      scope.m = initializeMatrix(2);
      let t = '<matrix-table bind="m"></matrix-table>';
      let element = compileAndDigest(t);
      expect(element[0].tagName).to.equal('MATRIX-TABLE');
    });

    describe('up arrow key', () => {

      it('focuses the input above', () => {
        scope.m = initializeMatrix(2);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let inputBelow = element.find('input').eq(2);
        let inputAbove = element.find('input').eq(0);

        let focusSpy = sinon.spy(inputAbove[0], 'focus');

        inputBelow.triggerHandler({
          type: 'keydown',
          keyCode: key.UP
        });

        expect(focusSpy).to.have.been.calledOnce;
      });

    });

    describe('down arrow key', () => {

      it('focuses the input below', () => {
        scope.m = initializeMatrix(2);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let inputBelow = element.find('input').eq(2);
        let inputAbove = element.find('input').eq(0);

        let focusSpy = sinon.spy(inputBelow[0], 'focus');

        inputAbove.triggerHandler({
          type: 'keydown',
          keyCode: key.DOWN
        });

        expect(focusSpy).to.have.been.calledOnce;
      });

      it('creates a new row when it is pressed at an input in the last row', () => {
        scope.m = initializeMatrix(2);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let input = element.find('input').eq(-1);

        input.triggerHandler({
          type: 'keydown',
          keyCode: key.DOWN
        });

        expect(scope.m).to.have.length(3, 'matrix rows length');
        expect(scope.m[2]).to.have.length(2, 'last matrix row length');
      });

      it('creates and shows a new row when it is pressed at an input in the last row', () => {
        scope.m = initializeMatrix(2);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let input = element.find('input').eq(-1);

        input.triggerHandler({
          type: 'keydown',
          keyCode: key.DOWN
        });

        scope.$digest();

        expect(element.find('tr')).to.have.length(3);
      });

      it('creates a new row with focus on the same column input' +
        ' when it is pressed at the last row', inject(($timeout) => {
          scope.m = initializeMatrix(2);
          let t = '<matrix-table bind="m"></matrix-table>';
          let element = compileAndDigest(t);

          let input = element.find('input').eq(-1);

          input.triggerHandler({
            type: 'keydown',
            keyCode: key.DOWN
          });

          scope.$digest();

          let newInput = element.find('input').eq(-1);
          let focusSpy = sinon.spy(newInput[0], 'focus');

          $timeout.flush();

          expect(focusSpy).to.have.been.calledOnce;
        }));

    });

    describe('right arrow key', () => {

      it('focuses right input when it is empty', () => {
        scope.m = initializeMatrix(2);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let leftInput = element.find('input').eq(0);
        let rightInput = element.find('input').eq(1);

        let focusSpy = sinon.spy(rightInput[0], 'focus');

        leftInput.triggerHandler({
          type: 'keydown',
          keyCode: key.RIGHT
        });

        expect(focusSpy).to.have.been.calledOnce;
      });

      it('focuses right input when caret is at the end', () => {
        let value = '123';
        scope.m = initializeMatrix(2);
        scope.m[0][0].value = value;
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let leftInput = element.find('input').eq(0);
        let rightInput = element.find('input').eq(1);

        setCaretPositionAt(leftInput, value.length);

        let focusSpy = sinon.spy(rightInput[0], 'focus');

        leftInput.triggerHandler({
          type: 'keydown',
          keyCode: key.RIGHT
        });

        expect(focusSpy).to.have.been.calledOnce;
      });

      it('does not focuses right input when caret is at the start', () => {
        let value = '123';
        scope.m = initializeMatrix(2);
        scope.m[0][0].value = value;
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let leftInput = element.find('input').eq(0);
        let rightInput = element.find('input').eq(1);

        setCaretPositionAt(leftInput, 0);

        let focusSpy = sinon.spy(rightInput[0], 'focus');

        leftInput.triggerHandler({
          type: 'keydown',
          keyCode: key.RIGHT
        });

        expect(focusSpy).to.not.have.been.called;
      });

    });

    describe('left arrow key', () => {

      it('focuses left input when it is empty', () => {
        scope.m = initializeMatrix(2);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let leftInput = element.find('input').eq(0);
        let rightInput = element.find('input').eq(1);

        let focusSpy = sinon.spy(leftInput[0], 'focus');

        rightInput.triggerHandler({
          type: 'keydown',
          keyCode: key.LEFT
        });

        expect(focusSpy).to.have.been.calledOnce;
      });

      it('focuses left input when caret is at the start', () => {
        let value = '123';
        scope.m = initializeMatrix(2);
        scope.m[0][1].value = value;
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let leftInput = element.find('input').eq(0);
        let rightInput = element.find('input').eq(1);

        setCaretPositionAt(rightInput, 0);

        let focusSpy = sinon.spy(leftInput[0], 'focus');

        rightInput.triggerHandler({
          type: 'keydown',
          keyCode: key.LEFT
        });

        expect(focusSpy).to.have.been.calledOnce;
      });

      it('does not focuses left input when caret is at the end', () => {
        let value = '123';
        scope.m = initializeMatrix(2);
        scope.m[0][1].value = value;
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let leftInput = element.find('input').eq(0);
        let rightInput = element.find('input').eq(1);

        setCaretPositionAt(rightInput, value.length);

        let focusSpy = sinon.spy(leftInput[0], 'focus');

        rightInput.triggerHandler({
          type: 'keydown',
          keyCode: key.LEFT
        });

        expect(focusSpy).to.not.have.been.calledOnce;
      });

    });

    describe('column', () => {

      it('is created when right arrow is pressed at the last column', () => {
        scope.m = initializeMatrix(2);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let rightInput = element.find('input').eq(1);

        rightInput.triggerHandler({
          type: 'keydown',
          keyCode: key.RIGHT
        });

        expect(scope.m[0]).to.have.length(3, 'first row');
        expect(scope.m[1]).to.have.length(3, 'second row');
      });

      it('is created and showed on dom when right arrow is pressed at the last column', () => {
        scope.m = initializeMatrix(2);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let rightInput = element.find('input').eq(1);

        rightInput.triggerHandler({
          type: 'keydown',
          keyCode: key.RIGHT
        });

        scope.$digest();

        expect(element.find('tr').eq(0).find('input')).to.have.length(3, 'first row');
        expect(element.find('tr').eq(1).find('input')).to.have.length(3, 'second row');
      });

      it('is not created when right arrow is pressed at last column but without caret at the end', () => {
        scope.m = initializeMatrix(2);
        scope.m[0][1].value = '123';
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let rightInput = element.find('input').eq(1);

        setCaretPositionAt(rightInput, 0);

        rightInput.triggerHandler({
          type: 'keydown',
          keyCode: key.RIGHT
        });

        expect(scope.m[0]).to.have.length(2, 'first row');
        expect(scope.m[1]).to.have.length(2, 'second row');
      });

      it('is created with focus when right arrow is pressed at last column', inject(($timeout) => {
        scope.m = initializeMatrix(2);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let rightInput = element.find('input').eq(1);

        rightInput.triggerHandler({
          type: 'keydown',
          keyCode: key.RIGHT
        });

        scope.$digest();

        let newInput = element.find('tr').eq(0).find('input').eq(2);
        let focusSpy = sinon.spy(newInput[0], 'focus');

        $timeout.flush();

        expect(focusSpy).to.have.been.calledOnce;
      }));

    });

    describe('enter key', () => {

      it('creates a new row when it is pressed at an input in the last row', () => {
        scope.m = initializeMatrix(2);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let input = element.find('input').eq(2);

        input.triggerHandler({
          type: 'keydown',
          keyCode: key.ENTER
        });

        expect(scope.m).to.have.length(3, 'matrix rows length');
        expect(scope.m[2]).to.have.length(2, 'last matrix row length');
      });

      it('creates and shows a new row when it is pressed at an input in the last row', () => {
        scope.m = initializeMatrix(2);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let input = element.find('input').eq(2);

        input.triggerHandler({
          type: 'keydown',
          keyCode: key.ENTER
        });

        scope.$digest();

        expect(element.find('tr')).to.have.length(3);
      });

      it('creates a new row with focus on the first input' +
        ' when it is pressed at the last row', inject(($timeout) => {
          scope.m = initializeMatrix(2);
          let t = '<matrix-table bind="m"></matrix-table>';
          let element = compileAndDigest(t);

          let input = element.find('input').eq(2);

          input.triggerHandler({
            type: 'keydown',
            keyCode: key.ENTER
          });

          scope.$digest();

          let newInput = element.find('tr').eq(2).find('input').eq(0);
          let focusSpy = sinon.spy(newInput[0], 'focus');

          $timeout.flush();

          expect(focusSpy).to.have.been.calledOnce;
        }));

      it('focuses on the first input of the next row', () => {
        scope.m = initializeMatrix(3);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let input = element.find('input').eq(1);
        let nextInput = element.find('tr').eq(1).find('input').eq(0);
        let focusSpy = sinon.spy(nextInput[0], 'focus');

        input.triggerHandler({
          type: 'keydown',
          keyCode: key.ENTER
        });

        expect(focusSpy).to.have.been.calledOnce;
      });

      it('does nothing if control is pressed', () => {
        scope.m = initializeMatrix(3);
        let t = '<matrix-table bind="m"></matrix-table>';
        let element = compileAndDigest(t);

        let input = element.find('input').eq(1);
        let nextInput = element.find('tr').eq(1).find('input').eq(0);
        let focusSpy = sinon.spy(nextInput[0], 'focus');

        input.triggerHandler({
          type: 'keydown',
          keyCode: key.ENTER,
          ctrlKey: true
        });

        expect(focusSpy).to.not.have.been.called;
      });

    });

  });

  function initializeMatrix(m, n = m) {
    let matrix = [];
    for (let i = 0; i < m; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        row.push({value: ''});
      }
      matrix.push(row);
    }
    return matrix;
  }

  function setCaretPositionAt(input, pos) {
    input[0].setSelectionRange(pos, pos);
  }

});
