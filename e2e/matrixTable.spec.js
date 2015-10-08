describe('matrix table', function() {
  var page = require('./main.po');
  var myEC = require('./myExpectedConditions');

  beforeEach(function() {
    page.load();
  });

  it('is present by default', function() {
    expect(page.matrixTable.isPresent()).toBe(true);
  });

  it('has at least an input by default', function() {
    expect(page.getMatrixTableInput(0, 0).isPresent()).toBe(true);
  });

  describe('input', function() {

    it('changes color when focused, when it has an invalid value, and when a valid value is restored', function() {
      var input = page.getMatrixTableInput(0, 0);
      var ec, ecFn = input.getCssValue.bind(input, 'border-color');

      ec = myEC.toChange(ecFn);
      input.sendKeys('1');
      browser.driver.wait(ec, 10000, 'Focus does not change input border color');

      ec = myEC.toChange(ecFn);
      input.sendKeys('@');
      browser.driver.wait(ec, 5000, 'Invalid value does not change input border color');

      ec = myEC.toChange(ecFn);
      input.sendKeys(protractor.Key.BACK_SPACE);
      browser.driver.wait(ec, 5000, 'Valid value does not change input border color');
    });

    it('focuses on the next input when space is pressed', function() {
      var input = page.getMatrixTableInput(1, 1);
      input.sendKeys('12');
      input.sendKeys(protractor.Key.SPACE);
      var focusedInput = browser.driver.switchTo().activeElement();
      focusedInput.sendKeys('34');
      expect(page.getMatrixTableInput(1, 2).getAttribute('value')).toBe('34');
    });

    it('does not adds a space when the space key is pressed', function() {
      var input = page.getMatrixTableInput(1, 1);
      input.sendKeys('1');
      input.sendKeys(protractor.Key.SPACE);
      expect(input.getAttribute('value')).toBe('1');
      expect(page.getMatrixTableInput(1, 2).getAttribute('value')).toBe('');
    });

    it('adds a column when right arrow key is pressed on the last column', function() {
      var input = page.getMatrixTableInput(1, -1);
      var firstRow = page.matrixTable.$$('tr').get(0);
      firstRow.$$('input').count().then(function(firstRowInputCount) {
        input.sendKeys(protractor.Key.ARROW_RIGHT);
        expect(firstRow.$$('input').count()).toBe(firstRowInputCount + 1);
      });
    });

    it('focuses on the next input when a column is added with the right arrow key', function() {
      var input = page.getMatrixTableInput(1, -1);
      input.sendKeys('12');
      input.sendKeys(protractor.Key.ARROW_RIGHT);
      var focusedInput = browser.driver.switchTo().activeElement();
      focusedInput.sendKeys('34');
      expect(input.getAttribute('value')).toBe('34');
    });

    it('focuses on the input below when a row is added with the down arrow key', function() {
      var input = page.getMatrixTableInput(-1, 1);
      input.sendKeys('12');
      input.sendKeys(protractor.Key.ARROW_DOWN);
      var focusedInput = browser.driver.switchTo().activeElement();
      focusedInput.sendKeys('34');
      expect(input.getAttribute('value')).toBe('34');
    });

    it('focuses on the first input of the newly added row when enter key is pressed', function() {
      var input = page.getMatrixTableInput(-1, 1);
      input.sendKeys('12');
      input.sendKeys(protractor.Key.ENTER);
      var focusedInput = browser.driver.switchTo().activeElement();
      focusedInput.sendKeys('34');
      expect(page.getMatrixTableInput(-1, 0).getAttribute('value')).toBe('34');
    });

    it('moves the caret when left arrow key is pressed and caret is not at the start', function() {
      var input = page.getMatrixTableInput(1, 1);
      input.sendKeys('12');
      input.getAttributeAsNumber('selectionStart').then(function(selectionStart) {
        input.sendKeys(protractor.Key.ARROW_LEFT);
        expect(input.getAttributeAsNumber('selectionStart')).toBe(selectionStart - 1);
      });
    });

    it('does not focuses the next input if caret is not at the end when right arrow key is pressed', function() {
      var input = page.getMatrixTableInput(1, 1);
      input.sendKeys('12');
      input.sendKeys(protractor.Key.ARROW_LEFT);
      input.sendKeys(protractor.Key.ARROW_RIGHT);
      var focusedInput = browser.driver.switchTo().activeElement();
      expect(focusedInput.getAttribute('value')).toBe('12');
    });

  });

});
