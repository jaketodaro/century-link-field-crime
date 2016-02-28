angular.module('CrimeReport').service('AppConfig', function() {
  return {
    startAddress: '800 Occidental Ave S, Seattle, WA 98134',
    startNumCrimes: 1000,
    numCrimesOptions: [1000, 5000, 10000, 25000, 50000],
    startSortBy: 'count',
    sortByOptions: ['type', 'count']
  }
});