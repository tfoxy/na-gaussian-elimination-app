describe('The main view', function() {
  var page;

  beforeEach(function() {
    browser.get('/index.html');
    page = require('./main.po');
  });

  it('should include a form', function() {
    expect(page.form.isPresent()).toBe(true);
  });

  describe('form', function() {

    it('should include a pivoting select element', function() {
      expect(page.pivotingSelect.isPresent()).toBe(true);
    });

  });

});
