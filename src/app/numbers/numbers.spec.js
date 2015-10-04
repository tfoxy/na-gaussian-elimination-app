import numbersModule from './numbers.module.js';

describe(numbersModule.name, () => {
  let numbers;

  beforeEach(angular.mock.module(numbersModule.name));

  beforeEach(inject((_numbers_) => {
    numbers = _numbers_;
  }));

  describe('#parse(string)', () => {

    it('returns an object', () => {
      let number = numbers.parse('1');
      expect(number).to.be.an('object');
    });

    it('returns an object with the same valueOf as the string', () => {
      let string = '12';
      let number = numbers.parse(string);
      expect(+number).to.equal(+string);
    });

    it('throws an error if the string has an invalid character (e.g. @)', () => {
      let string = '12@';
      let fn = numbers.parse.bind(numbers, string);
      expect(fn).to.throw(Error);
    });

    it('accepts a fraction', () => {
      let string = '5/4';
      let number = numbers.parse(string);
      expect(+number).to.equal(1.25);
    });

  });

  describe('#createDecimalParser', () => {

    it('returns a function', () => {
      let parseDecimal = numbers.createDecimalParser(3);
      expect(parseDecimal).to.be.a('function');
    });

    it('returns a parser that accepts a fraction', () => {
      let parseDecimal = numbers.createDecimalParser(3);
      let number = parseDecimal('3/4');
      expect(number.toString()).to.equal('0.75');
    });

    it('returns a parser that rounds the numbers to the specified precision', () => {
      let parseDecimal = numbers.createDecimalParser(1);
      let number = parseDecimal('3/4');
      expect(number.toString()).to.equal('0.8');
    });

  });

  describe('#changeType', () => {

    it('can modify the parse method to return a rounded number', () => {
      numbers.changeType('decimal', 1);
      let number = numbers.parse('3/4');
      expect(number.toString()).to.equal('0.8');
    });

  });

});
