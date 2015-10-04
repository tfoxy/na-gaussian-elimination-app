import inputModule from './input.module.js';

describe(inputModule.name + '.InputController', () => {
  let scope, controller;

  beforeEach(angular.mock.module(inputModule.name));

  beforeEach(inject(($rootScope, $controller) => {
    scope = $rootScope.$new();
    controller = $controller('InputController', {$scope: scope});
  }));


  it('pressing ctrl+enter sends submit', () => {
    let spy = controller.submit = sinon.spy();

    controller.keydownListener({
      keyCode: 13,
      ctrlKey: true
    });

    expect(spy).to.have.been.calledOnce;
  });

  describe('#submit()', () => {

    it('starts solving the system', inject((gaussianElimination) => {
      let spy = gaussianElimination.solve = sinon.spy();
      controller.matrixCtrl = {
        getMatrix: sinon.stub().returns([[1, 2, 5], [3, 4, 6]])
      };

      controller.submit();

      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWith([[1, 2], [3, 4]], [5, 6]);
    }));

  });

});
