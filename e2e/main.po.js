/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

function MainPage() {
  this.form = $('form[name="inputForm"]');
  this.solutionView = $('#solution-view');
  this.stepsView = $('#steps-view');

  this.matrixTable = this.form.element(by.css('matrix-table'));
  this.precisionInput = this.form.element(by.css('input[name="decimalPrecisionNumber"]'));
  this.exactTypeRadio = this.form.element(by.css('input[name="exactNumberType"]'));
  this.decimalTypeRadio = this.form.element(by.css('input[name="decimalNumberType"]'));
  this.pivotingSelect = this.form.element(by.css('select[name="pivoting"]'));
  this.matrixInput = this.form.element(by.css('matrix-input'));
  this.roundingModeSelect = this.form.element(by.css('select[name="roundingMode"]'));
  this.zerosRadio = this.form.element(by.css('select[name="luFlagFalse"]'));
  this.luRadio = this.form.element(by.css('select[name="luFlagTrue"]'));

  this.submitButton = this.form.element(by.css('button[type="submit"]'));
}

module.exports = new MainPage();
