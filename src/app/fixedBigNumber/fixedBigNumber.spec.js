import fixedBigNumberFactory from './fixedBigNumber.factory.js';

/* global BigNumber */

describe('FixedBigNumber', () => {
  let createFixedBigNumberClass = fixedBigNumberFactory(BigNumber);

  describe('#plus(n)', () => {

    it('does not change the value if a number outside of precision is added 10 times', () => {
      let FixedBigNumber = createFixedBigNumberClass(2);
      let num = new FixedBigNumber('1');
      let smallNum = new FixedBigNumber('0.01');
      let sum = num;

      for (let i = 0; i < 10; i++) {
        sum = sum.plus(smallNum);
      }

      expect(sum).to.deep.equal(num);
    });

    it('uses default ROUNDING_MODE if not specified', () => {
      let FixedBigNumber = createFixedBigNumberClass(1);
      let num = new FixedBigNumber('1').plus('0.5');

      expect(num.toString()).to.deep.equal('2');
    });

  });

  describe('#div(n)', () => {

    it('returns the same amount of digits as the precision,' +
    ' when result has an integer part', () => {
      let FixedBigNumber = createFixedBigNumberClass(5);
      let result = new FixedBigNumber('1000').div('3');

      expect(result.toString()).to.equal('333.33');
    });

    it('returns the same amount of digits as the precision,' +
    ' when precision is greater than default DECIMAL_PLACES', () => {
      let FixedBigNumber = createFixedBigNumberClass(50);
      let result = new FixedBigNumber('1000').div('3');

      expect(result.toString()).to.have.length(51);
    });

  });

});
