/* global bigRat */

export default angular.module('bigRational', [])
  .constant('bigRational', bigRat);


let prototype = Object.getPrototypeOf(bigRat.one);

// prototype.abs
// prototype.add
prototype.cmp = prototype.compare;
prototype.div = prototype.divide;
// prototype.isZero
prototype.neg = prototype.negate;
prototype.sub = prototype.subtract;
// prototype.times

// toString must return '1' instead of '1/1'
prototype._toString = prototype.toString;
prototype.toString = function toString(...args) {
  let string = this._toString(...args);
  return string.replace(/\/1$/, '');
};
