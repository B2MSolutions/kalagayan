var app = angular.module('App', ['filters']);

angular.module('filters', []).filter('status', function() {
  return function(input) {
    switch(input) {
      case 'OK':
        return 'green';
      case '?' : 
        return 'blue';
      case 'Fail':
        return 'red';
    } 

    return '';
  };
});

app.controller('StatusController', ['$scope', '$http',
  function($scope, $http) {
    $scope.services = [];

    $http.get('/services').success(function(data) {
      $scope.services = data;
    });
  }
]);
