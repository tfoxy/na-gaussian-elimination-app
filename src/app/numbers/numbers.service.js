class Numbers {

  constructor(bigRational, createFixedBigNumberClass) {
    'ngInject';

    this._bigRational = bigRational;
    this._createFixedBigNumberClass = createFixedBigNumberClass;
    this.parse = this.parseFraction.bind(this);
  }

  changeType(type, precision, roundingMode) {
    if (type === 'fraction') {
      this.parse = this.parseFraction.bind(this);
    } else if (type === 'decimal') {
      this.parse = this.createDecimalParser(precision, roundingMode);
    } else {
      throw new Error('Unknown type');
    }
  }

  parseFraction(string) {
    return this._bigRational(string);
  }

  createDecimalParser(precision, roundingMode) {
    let FixedBigNumber = this._createFixedBigNumberClass(precision, roundingMode);

    return function parseDecimal(string) {
      let rationalNumber = this.parseFraction(string);
      let numerator = rationalNumber.numerator.toString();
      let denominator = rationalNumber.denominator.toString();
      let decimalNumber = new FixedBigNumber(numerator).div(denominator);
      return decimalNumber;
    }.bind(this);
  }

}

export default Numbers;
