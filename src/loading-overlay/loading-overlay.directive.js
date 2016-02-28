angular.module('CrimeReport').directive('crLoadingOverlay', function() {
  return {
    restrict: 'E',
    templateUrl: 'src/loading-overlay/Loading-overlay.tpl.html'
  }
});