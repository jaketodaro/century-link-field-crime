angular.module('CrimeReport').directive('crLoadingOverlay', function($templateCache) {
  return {
    restrict: 'E',
    template: $templateCache.get('loading-overlay/loading-overlay.tpl.html')
  }
});