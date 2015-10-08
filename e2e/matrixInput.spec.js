describe('matrix input directive element', function() {
  var page = require('./main.po');

  beforeEach(function() {
    page.load();
  });

  it('shows matrix table instead of textarea by default', function() {
    expect(page.matrixTable.isPresent()).toBe(true);
    expect(page.matrixTextarea.isPresent()).toBe(false);
  });

  describe('cells button', function() {

    it('changes matrix table to a textarea', function() {
      page.matrixButtons.cells.click();

      expect(page.matrixTextarea.isPresent()).toBe(true);
      expect(page.matrixTable.isPresent()).toBe(false);
    });

    it('returns to the default state when clicked twice', function() {
      page.matrixButtons.cells.click();
      page.matrixButtons.cells.click();

      expect(page.matrixTable.isPresent()).toBe(true);
      expect(page.matrixTextarea.isPresent()).toBe(false);
    });

  });

  describe('clears button', function() {

    it('resets the size of the matrix', function() {
      var initialRowsCount = page.matrixTableRows.count();
      page.matrixButtons.increase.click();
      page.matrixButtons.clear.click();
      expect(page.matrixTableRows.count()).toBe(initialRowsCount);
    });

    it('empties the content of all the inputs', function() {
      var firstInput = page.getMatrixTableInput(0, 0);
      var anotherInput = page.getMatrixTableInput(1, 1);

      firstInput.sendKeys('123');
      anotherInput.sendKeys('456');

      page.matrixButtons.clear.click();

      expect(firstInput.getAttribute('value')).toBe('');
      expect(anotherInput.getAttribute('value')).toBe('');
    });

  });

  describe('increase button', function() {

    it('adds a row', function() {
      page.matrixTableRows.count().then(function(initialRowsCount) {
        page.matrixButtons.increase.click();
        expect(page.matrixTableRows.count()).toBe(initialRowsCount + 1);
      });
    });

    it('adds a column', function() {
      var firstRowInputs = page.matrixTableRows.get(0).$$('input');
      firstRowInputs.count().then(function(initialColumnsCount) {
        page.matrixButtons.increase.click();
        expect(firstRowInputs.count()).toBe(initialColumnsCount + 1);
      });
    });

  });

  describe('decrease button', function() {

    it('removes a row', function() {
      page.matrixTableRows.count().then(function(initialRowsCount) {
        page.matrixButtons.decrease.click();
        expect(page.matrixTableRows.count()).toBe(initialRowsCount - 1);
      });
    });

    it('removes a column', function() {
      var firstRowInputs = page.matrixTableRows.get(0).$$('input');
      firstRowInputs.count().then(function(initialColumnsCount) {
        page.matrixButtons.decrease.click();
        expect(firstRowInputs.count()).toBe(initialColumnsCount - 1);
      });
    });

  });

});
