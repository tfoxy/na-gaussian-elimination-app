/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

function MainPage() {
  this.form = $('form[name="inputForm"]');
  this.solutionView = $('.solution-view');
  this.stepsView = $('.steps-view');

  this.matrixTable = this.form.$('matrix-table');
  this.precisionInput = this.form.$('input[name="decimalPrecisionNumber"]');
  this.exactTypeRadio = this.form.$('input[name="exactNumberType"]');
  this.decimalTypeRadio = this.form.$('input[name="decimalNumberType"]');
  this.pivotingSelect = this.form.$('select[name="pivoting"]');
  this.matrixInput = this.form.$('matrix-input');
  this.roundingModeSelect = this.form.$('select[name="roundingMode"]');
  this.zerosRadio = this.form.$('select[name="luFlagFalse"]');
  this.luRadio = this.form.$('select[name="luFlagTrue"]');
  this.submitButton = this.form.$('button[type="submit"]');
}

MainPage.prototype.getMatrixTableInput = getMatrixTableInput;
MainPage.prototype.load = load;

function getMatrixTableInput(i, j) {
  return this.matrixTable.$$('tr').get(i).$$('input').get(j);
}

function load() {
  browser.get('/index.html');
}

module.exports = new MainPage();
