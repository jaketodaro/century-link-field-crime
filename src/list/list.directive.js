angular.module('CrimeReport').directive('crList', function($templateCache) {
  return {
    restrict: 'E',
    template: $templateCache.get('list/list.tpl.html')
  }
});