describe('matrix table', function() {
  var page = require('./main.po');

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

    // TODO use wait instead of sleep
    xit('turns red when an invalid character is typed', function() {
      var input = page.getMatrixTableInput(0, 0);
      var initialBorderColor = input.getCssValue('border-color');
      input.sendKeys('@');
      // Wait for css value to change
      browser.driver.sleep(1000).then(function() {
        var borderColor = input.getCssValue('border-color');
        expect(borderColor).not.toBe(initialBorderColor);
      });
    });

    // TODO use wait instead of sleep
    xit('goes back to normal when the invalid character is removed', function() {
      var input = page.getMatrixTableInput(0, 0);
      var initialBorderColor = input.getCssValue('border-color');
      input.sendKeys('@');
      // Wait for css value to change
      browser.driver.sleep(1000).then(function() {
        input.sendKeys(protractor.Key.BACK_SPACE);
        // Wait for css value to change
        return browser.driver.sleep(2500);
      }).then(function() {
        var borderColor = input.getCssValue('border-color');
        expect(borderColor).toBe(initialBorderColor);
      });
    });

    it('focuses on the next input when space is pressed', function() {
      var input = page.getMatrixTableInput(1, 1);
      input.sendKeys('12');
      input.sendKeys(protractor.Key.SPACE);
      var focusedInput = browser.driver.switchTo().activeElement();
      focusedInput.sendKeys('34');
      expect(input.getAttribute('value')).toBe('12');
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

    // FIXME
    xit('focuses on the next input when a column is added with the right arrow key', function() {
      var input = page.getMatrixTableInput(1, -1);
      input.sendKeys('12');
      input.sendKeys(protractor.Key.ARROW_RIGHT);
      var focusedInput = browser.driver.switchTo().activeElement();
      focusedInput.sendKeys('34');
      expect(input.getAttribute('value')).toBe('12');
      expect(page.getMatrixTableInput(1, -1).getAttribute('value')).toBe('34');
    });

    // FIXME
    xit('focuses on the input below when a row is added with the down arrow key', function() {
      var input = page.getMatrixTableInput(-1, 1);
      input.sendKeys('12');
      input.sendKeys(protractor.Key.ARROW_DOWN);
      var focusedInput = browser.driver.switchTo().activeElement();
      focusedInput.sendKeys('34');
      expect(input.getAttribute('value')).toBe('12');
      expect(page.getMatrixTableInput(-1, 1).getAttribute('value')).toBe('34');
    });

    // FIXME
    xit('focuses on the first input of the newly added row when enter key is pressed', function() {
      var input = page.getMatrixTableInput(-1, 1);
      input.sendKeys('12');
      input.sendKeys(protractor.Key.ENTER);
      var focusedInput = browser.driver.switchTo().activeElement();
      focusedInput.sendKeys('34');
      expect(input.getAttribute('value')).toBe('12');
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
