module.exports = {
  toBe: toBe,
  toBeInitialValueOf: toBeInitialValueOf,
  toChange: toChange
};

function toBe(leftPromiseFn, rightPromiseFn) {
  return function toBeFn() {
    return protractor.promise.all([leftPromiseFn(), rightPromiseFn()]).then(function(values) {
      return values[0] === values[1];
    });
  };
}

function toBeInitialValueOf(leftPromiseFn, rightPromise) {
  var rightValue;
  rightPromise.then(function(rightValueParam) {
    rightValue = rightValueParam;
  });
  return function toBeInitialValueOfFn() {
    return leftPromiseFn().then(function(leftValue) {
      return leftValue === rightValue;
    });
  };
}

function toChange(promiseFn) {
  return protractor.ExpectedConditions.not(toBeInitialValueOf(promiseFn, promiseFn()));
}
