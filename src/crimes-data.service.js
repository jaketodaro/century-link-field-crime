angular.module('CrimeReport').service('CrimesData', function($http) {
  const baseUrl = 'https://data.seattle.gov/resource/3k2p-39jp.json';

  return {
    getCrimes: function(lat, lng, limit) {
      limit = limit || 1000;

      const query = `?$limit=${limit}&$where=within_circle(incident_location,${lat},${lng},1609)`;

      return $http.get(baseUrl + query, {cached: true}).then(function(result) {
        return result.data;
      });
    }
  }
});