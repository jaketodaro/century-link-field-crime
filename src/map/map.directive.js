angular.module('CrimeReport').directive('crMap', function() {
  return {
    restrict: 'E',
    scope: {
      lat: '&',
      lng: '&',
      heatLocations: '&'
    },
    link: function(scope, element) {
      var map;
      var circle;
      var heatmap;

      map = new google.maps.Map(element[0], {
        center: {lat: 0, lng: 0},
        zoom: 14,
        minZoom: 13,
        maxZoom: 15,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false
        //disableDefaultUI: true,
        //disableDoubleClickZoom: true,
        //draggable: false,
        //scrollwheel: false
      });

      heatmap = new google.maps.visualization.HeatmapLayer({
        data: [],
        map: map,
        radius: 20,
        opacity: .5
      });

      window.circle = circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'transparent',
        fillOpacity: 0,
        map: map,
        center: map.center,
        radius: 1609
      });

      scope.$watchGroup(['lat()', 'lng()'], function(location, oldLocation) {
        if (location !== oldLocation) {
          map.setCenter(new google.maps.LatLng(location[0], location[1]));
          circle.setCenter(new google.maps.LatLng(location[0], location[1]));
        }
      });

      scope.$watch('heatLocations()', function(items) {
        if (_.isArray(items)) {
          heatmap.setData(items);
        }
      });
    }
  }
});