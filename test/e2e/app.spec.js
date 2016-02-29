describe('CrimeReport', function() {

  beforeEach(function() {
    // mock out google API backend and data.seattle.gov backend
  })

  describe('toolbar', function() {
    it('should have a toolbar with a title', function() {
      browser.get('http://century-link-crime-report.bitballoon.com/');

      expect(element(by.css('cr-toolbar .navbar-brand')).getText()).toBe('Crimes near CenturyLink Field');
    });
  });
});