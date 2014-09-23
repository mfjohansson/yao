angular.module('yao').controller('CollectionCtrl', ['$scope', function($scope) {
}]);

angular.module('yao').controller('CollectionListCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  $scope.collections = [];

  $scope.list = function() {
    $http.get('/api/v1/collections').success(function(collections) {
      $scope.collections = collections;
      $rootScope.$broadcast('listCollection', collections);
    });
  };

  $scope.view = function(col) {
    $rootScope.$broadcast('viewCollection', col);
  };

  $scope.$on('createCollection', function() {
    $scope.list();
  });

}]);

angular.module('yao').controller('CollectionCreateCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  $scope.collection = {fields:[{type: 'yao_string', labels: []}]};

  $scope.create = function() {
    $http.post('/api/v1/collections', $scope.collection).success(function(col) {
      $rootScope.$broadcast('createCollection', col);
      $scope.collection = {fields:[]};
    });
  };

  $scope.addField = function() {
    $scope.collection.fields.push({fields:[{type: 'yao_string', labels: []}]});
  };
  $scope.removeField = function(field) {
    $scope.collection.fields.splice($scope.collection.fields.indexOf(field), 1);
  };

  $scope.addLabel = function(field) {
    field.labels.push({});
  };
  $scope.removeLabel = function(field, label) {
    field.labels.splice(field.labels.indexOf(label), 1);
  };

  $scope.types = [];
  $scope.getTypes = function() {
    $http.get('/api/v1/types').success(function(types) {
      $scope.types = types;
    });
  };

  $scope.getTypes();

}]);

angular.module('yao').controller('CollectionUpdateCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.collection = {fields:[]};

  $scope.update = function() {
    $http.post('/api/v1/collections/' + $scope.collection._id).success(function(collections) {
    });
  };

  $scope.addField = function() {
    $scope.collection.fields.push({type: 'text'});
  };
  $scope.removeField = function(field) {
    $scope.collection.fields.splice($scope.collection.fields.indexOf(field), 1);
  };

  /*$scope.$on('viewCollection', function(e, data) {
    $scope.collection = data;
    return e;
  });*/

  $scope.$on('createCollection', function(e, data) {
    console.log('created');
    $scope.collection = data;
    return e;
  });

}]);

angular.module('yao').controller('CollectionViewCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.collection = {};

  $scope.view = function() {
    $http.get('/api/v1/collections/' + $scope.collection._id).success(function(collection) {
      $scope.collection = collection;
    });
  };

  $scope.$on('viewCollection', function(e, data) {
    $scope.collection = data;
    return e;
  });

  $scope.$on('createCollection', function(e, data) {
    $scope.collection = data;
    return e;
  });

}]);