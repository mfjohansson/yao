angular.module('yao').controller('CollectionCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  $scope.collections = [];

  $scope.list = function() {
    $http.get('/api/v1/collections').success(function(collections) {
      $scope.collections = collections;
      $rootScope.$broadcast('listCollection', collections);
    });
  };

  $scope.$on('createCollection', function() {
    $scope.list();
  });

  $scope.$on('removeCollection', function() {
    $scope.list();
  });

}]);

angular.module('yao').controller('CollectionListCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

  $scope.view = function(col) {
    $rootScope.$broadcast('viewCollection', col);
  };

}]);

angular.module('yao').controller('CollectionCreateCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  $scope.collection = {fields:[{type: 'yao_string', labels: []}]};
  $scope.actionType = 'Create collection';

  $scope.create = function() {
    $http.post('/api/v1/collections', $scope.collection).success(function(col) {
      $rootScope.$broadcast('createCollection', col);
      $scope.collection = {fields:[]};
    });
  };

  $scope.addField = function() {
    if (!$scope.collection.fields) {
      $scope.collection.fields = [];
    }
    $scope.collection.fields.push({fields:[{type: 'yao_string', labels: []}]});
    console.log($scope.collection.fields);
  };
  $scope.removeField = function(field) {
    $scope.collection.fields.splice($scope.collection.fields.indexOf(field), 1);
  };

  $scope.addLabel = function(field) {
    if (!field.labels) {
      field.labels = [];
    }
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

angular.module('yao').controller('CollectionUpdateCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  $scope.collection = {};
  $scope.actionType = 'Update collection';

  $scope.create = function() {
    $http.post('/api/v1/collections/' + $scope.collection.system_name, $scope.collection).success(function(col) {
      $rootScope.$broadcast('createCollection', col);
      $scope.collection = col;
    });
  };

  $scope.addField = function() {
    if (!$scope.collection.fields) {
      $scope.collection.fields = [];
    }
    $scope.collection.fields.push({fields:[{type: 'yao_string', labels: []}]});
    console.log($scope.collection.fields);
  };
  $scope.removeField = function(field) {
    $scope.collection.fields.splice($scope.collection.fields.indexOf(field), 1);
  };

  $scope.addLabel = function(field) {
    if (!field.labels) {
      field.labels = [];
    }
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

  $scope.$on('viewCollection', function(e, data) {
    $scope.collection = data;
    return e;
  });

  $scope.$on('removeCollection', function(e, data) {
    $scope.collection = {};
    return e;
  });

}]);

angular.module('yao').controller('CollectionViewCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
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

  $scope.remove = function() {
    if (confirm('Really?')) {
      $http.delete('/api/v1/collections/' + $scope.collection.system_name).success(function() {
        $scope.collection = {};
        $rootScope.$broadcast('removeCollection', {});
      });
    }
  };

}]);