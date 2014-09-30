angular.module('yao').controller('ItemCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  $scope.items = [];
  $scope.collection = {};
  $scope.refItems = [];

  $scope.list = function() {
    $http.get('/api/v1/items/' + $scope.collection.system_name).success(function(items) {
      $scope.items = items;
    });
  };

  $scope.$on('createItem', function() {
    $scope.list();
  });

  $scope.$on('viewCollection', function(e, data) {
    $scope.collection = data;
    $scope.list();

    // Load ref items
    var i = 0;
    var l = data.fields.length;
    while (i < l) {
      if (data.fields[i].type === 'yao_ref') {
        $scope.loadRef(data.fields[i].ref);
      }
      ++i;
    }

    return e;
  });

  $scope.loadRef = function(ref) {
    $http.get('/api/v1/items/' + ref).success(function(items) {
      $scope.refItems[ref] = items;
    });
  };

}]);

angular.module('yao').controller('ItemListCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

  $scope.view = function(col) {
    $rootScope.$broadcast('viewItem', col);
  };

}]);

angular.module('yao').controller('ItemCreateCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  $scope.item = {};
  $scope.actionType = 'Create ' + $scope.collection.name;

  $scope.collection = {};

  $scope.create = function() {
    $http.post('/api/v1/items/' + $scope.collection.system_name, $scope.item).success(function(col) {
      $rootScope.$broadcast('createItem', col);
      $scope.item = {};
    });
  };

  $scope.$on('viewCollection', function(e, data) {
    $scope.collection = data;

    $scope.actionType = 'Create ' + $scope.collection.name;
    $scope.item = {};

    return e;
  });

}]);

angular.module('yao').controller('ItemUpdateCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  $scope.item = {};
  $scope.actionType = 'Update ' + $scope.collection.name;

  $scope.collection = {};

  $scope.create = function() {
    $http.post('/api/v1/items/' + $scope.collection.system_name + '/' + $scope.item._id, $scope.item).success(function(item) {
      $rootScope.$broadcast('createItem', item);
      $scope.item = item;
    });
  };

  $scope.$on('viewItem', function(e, data) {
    $scope.item = data;
    $scope.actionType = 'Update ' + $scope.collection.name + ': ' + $scope.item.name;
    return e;
  });

  $scope.$on('removeItem', function(e, data) {
    $scope.item = {};
    return e;
  });

  $scope.$on('viewCollection', function(e, data) {
    $scope.collection = data;

    $scope.actionType = 'Update ' + $scope.collection.name;
    $scope.item = {};

    return e;
  });

}]);

angular.module('yao').controller('ItemViewCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.item = {};

  $scope.view = function() {
    $http.get('/api/v1/items/' + $scope.item._id).success(function(item) {
      $scope.item = item;
    });
  };

  $scope.$on('viewItem', function(e, data) {
    $scope.item = data;
    return e;
  });

  $scope.$on('createItem', function(e, data) {
    $scope.item = data;
    return e;
  });

  $scope.$on('viewCollection', function(e, data) {
    $scope.collection = data;
    $scope.item = {};
    return e;
  });

}]);