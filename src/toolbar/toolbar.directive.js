angular.module('CrimeReport').directive('crToolbar', function($templateCache) {
  return {
    restrict: 'E',
    template: $templateCache.get('toolbar/toolbar.tpl.html'),
    scope: {
      numCrimes: '=',
      numCrimesOptions: '&'
    }
  }
});