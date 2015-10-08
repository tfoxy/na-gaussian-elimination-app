describe('The main app', function() {
  var page = require('./main.po');

  /*
   * NOTE: using solutionEquation.getText() crashes the tests
   */

  beforeEach(function() {
    page.navigate();
  });

  it('can solve a 3x3 system with a precision of 3 and complete pivoting', function() {
    var inputValues = [
      2.15, -0.924, -1.29, 1.22,
      -4.12, 2.29, 0.294, -3.56,
      1.01, 0.872, -3.25, -0.972
    ];

    page.matrixTableInputs.each(function(element, index) {
      element.sendKeys(inputValues[index]);
    });

    page.pivotingSelect.element(by.cssContainingText('option', 'complete')).click();

    page.decimalTypeRadio.click();

    page.precisionInput.sendKeys('3');

    page.submitButton.click();

    var solutionText = page.solutionEquation.getAttribute('textContent');

    expect(solutionText).toMatch(/ 0\.859 /);
    expect(solutionText).toMatch(/ -0\.081 /);
    expect(solutionText).toMatch(/ 0\.541 /);
  });

  it('can move through the matrix with the keys and submit with ctrl+enter', function() {
    page.matrixButtons.decrease.click();

    page.getMatrixTableInput(0, 0).click();

    page.getActiveElement().sendKeys('1');
    page.getActiveElement().sendKeys(protractor.Key.ARROW_RIGHT);

    page.getActiveElement().sendKeys('1');
    page.getActiveElement().sendKeys(protractor.Key.ARROW_LEFT);
    page.getActiveElement().sendKeys('-');
    page.getActiveElement().sendKeys(protractor.Key.ARROW_RIGHT);
    page.getActiveElement().sendKeys(protractor.Key.TAB);

    page.getActiveElement().sendKeys('0');
    page.getActiveElement().sendKeys(protractor.Key.ENTER);

    page.getActiveElement().sendKeys(protractor.Key.SPACE);
    page.getActiveElement().sendKeys(protractor.Key.ARROW_LEFT);
    page.getActiveElement().sendKeys(protractor.Key.TAB);

    page.getActiveElement().sendKeys('1/5');
    page.getActiveElement().sendKeys(protractor.Key.SPACE);

    page.getActiveElement().sendKeys('1/5');
    page.getActiveElement().sendKeys(protractor.Key.ARROW_UP);

    expect(page.solutionEquation.getAttribute('textContent')).not.toMatch('x');

    page.getActiveElement().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, protractor.Key.ENTER));

    expect(page.solutionEquation.getAttribute('textContent')).toMatch('x');
    expect(page.solutionEquation.getAttribute('textContent')).toMatch(/ 1 \\\\ 1 /); // solution is [1, 1]
  });

});
