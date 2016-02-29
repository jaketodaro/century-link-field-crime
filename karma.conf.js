module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],

    frameworks: ['jasmine'],

    files: [
      'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.5.1/lodash.js',
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-mocks.js',
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCjbZIZDHVpCg7HGR22YhSox8koV3JVoxU&libraries=visualization,places',
      'dist/*',
      'test/unit/**/*spec.js'
    ]
  });
};