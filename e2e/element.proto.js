protractor.ElementFinder.prototype.getAttributeAsNumber = function(attributeName) {
  return this.getAttribute(attributeName).then(function(value) {
    return +value;
  });
};
