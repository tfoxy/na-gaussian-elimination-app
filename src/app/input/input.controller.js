class InputController {
  constructor(numbers, inputData) {
    'ngInject';

    this.valueParser = function valueParser(string) {
      return numbers.parse(string);
    };

    this.data = inputData;
  }

  keydownListener(ev) {
    // 13 === 'ENTER'
    if (ev.ctrlKey && ev.keyCode === 13) {
      this.submit();
    }
  }

  submit() {
    let augmentedMatrix = this.matrixCtrl.getMatrix();
    this.data.solve(augmentedMatrix);
  }

}

export default InputController;
