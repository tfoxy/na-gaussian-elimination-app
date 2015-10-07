describe('The main view', function() {
  var page = require('./main.po');

  beforeEach(function() {
    page.load();
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
