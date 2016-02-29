angular.module('CrimeReport').controller('AppCtrl', function($scope, $http, AppConfig, CrimesData) {

  $scope.appConfig = AppConfig;

  $scope.model = {
    lat: 0,
    lng: 0,
    numCrimes: AppConfig.startNumCrimes,
    heatLocations: [],
    crimeGroups: [],
    sortBy: AppConfig.startSortBy,
    toggleAllCheckbox: true,
    isLoading: false
  };

  var geocoder = new google.maps.Geocoder();

  // Kick things off with the stored starting address
  geocoder.geocode({ 'address': AppConfig.startAddress }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();

      $scope.$apply(function() {
        $scope.model.lat = lat;
        $scope.model.lng = lng;
      });
    } else {
      console.warn('Geocode was not successful for the following reason: ' + status);
    }
  });

  $scope.$watchGroup(['model.lat', 'model.lng', 'model.numCrimes'], (attrs) => {
    if (attrs[0]) {
      $scope.model.isLoading = true;
      console.time('fetch');
      CrimesData.getCrimes(attrs[0], attrs[1], attrs[2]).then((crimes) => {
        console.timeEnd('fetch');

        $scope.model.isLoading = false;
        $scope.model.toggleAllCheckbox = true;

        console.time('process');
        $scope.model.crimeGroups = CrimesData.groupCrimes(crimes);
        this.updateHeatLocations();
        console.timeEnd('process');
      });
    }
  });

  this.toggleCrimeGroup = function() {
    $scope.model.toggleAllCheckbox = _.every($scope.model.crimeGroups, 'included');

    this.updateHeatLocations();
  };

  this.toggleAllCrimeGroups = function() {
    _.each($scope.model.crimeGroups, function(crimeGroup) {
      crimeGroup.included = $scope.model.toggleAllCheckbox;
    });

    this.updateHeatLocations();
  };

  this.updateHeatLocations = function() {
    $scope.model.heatLocations = _.reduce($scope.model.crimeGroups, function(locations, crimeGroup) {
      if (crimeGroup.included) {
        var crimeGroupLocations = _.map(crimeGroup.crimes, function(crime) {
          return new google.maps.LatLng(crime.latitude, crime.longitude);
        });

        return locations.concat(crimeGroupLocations);
      } else {
        return locations;
      }
    }, []);
  }
});