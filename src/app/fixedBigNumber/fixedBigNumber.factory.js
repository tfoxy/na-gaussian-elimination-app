function fixedBigNumberFactory(BigNumber) {
  'ngInject';

  return function createFixedBigNumberClass(sd, rm) {
    let FixedBigNumber = BigNumber.another({
      DECIMAL_PLACES: sd,
      ROUNDING_MODE: rm,
      POW_PRECISION: sd
    });

    let prototype = FixedBigNumber.prototype;

    let methodList = [
      'dividedBy', 'div',
      'dividedToIntegerBy', 'divToInt',
      'minus', 'sub',
      'plus', 'add',
      'squareRoot', 'sqrt',
      'times', 'mul',
      'toPower', 'pow'
    ];

    methodList.forEach((methodName) => {
      let auxName = '_' + methodName;
      prototype[auxName] = prototype[methodName];

      prototype[methodName] = function fixedOp(args) {
        let num = this[auxName](args);
        return num.toDigits(sd);
      };
    });

    return FixedBigNumber;
  };
}

export default fixedBigNumberFactory;
