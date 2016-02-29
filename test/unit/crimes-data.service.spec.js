describe('CrimesData', function() {
  var crimesData;

  // Set up the module
  beforeEach(module('CrimeReport'));

  beforeEach(inject(function($injector, CrimesData) {
    crimesData = CrimesData;
  }));

  describe('groupCrimes', function() {
    it('should correctly group the crimes', function() {
      var crimes = [
        { event_clearance_group: 'type1' },
        { event_clearance_group: 'type1' },
        { event_clearance_group: 'type2' },
        { event_clearance_group: undefined }
      ];

      var groups = crimesData.groupCrimes(crimes);
      var expected = [
        {
          type: 'type1',
          count: 2,
          crimes: [{ event_clearance_group: 'type1' },  { event_clearance_group: 'type1' }],
          included: true
        },
        {
          type: 'type2',
          count: 1,
          crimes: [{ event_clearance_group: 'type2' }],
          included: true
        },
        {
          type: 'OTHER',
          count: 1,
          crimes: [{ event_clearance_group: undefined }],
          included: true
        }
      ];

      expect(groups).toEqual(expected);
    });
  });
});