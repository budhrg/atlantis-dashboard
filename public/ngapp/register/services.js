var services = angular.module('atlantisApp.registerServices', []);

services.factory('supervisorFactory', ['$http', function($http){
  var sup = {};

  var callGet = function(url, callback) {
    $http.get(url).success(callback);
  };

  sup.getSupervisors = function(callback){
    callGet("/supervisors",callback);
  };

  return sup;
}]);

services.factory('addSupervisor', ['$modal', function($modal){
  return {
    modalInstance:  function(templateUrl, name, itemType) {
      return $modal.open({
        templateUrl: templateUrl,
        controller: function ($scope, $modalInstance, name) {
          $scope.name = name;
          $scope.itemType = itemType;

          $scope.ok = function () {
            $modalInstance.close(name);
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        },
        resolve: {
          name: function() {
            return name;
          },
          itemType: function() {
            return itemType;
          }
        }
      });
    }
  }
}]);

services.factory('deleteSupervisor', ['$modal', function($modal){
  return {
    modalInstance:  function(templateUrl, name, type, itemType) {
      return $modal.open({
        templateUrl: templateUrl,
        controller: function ($scope, $modalInstance, name) {
          $scope.confirmName = '';
          $scope.name = name;
          $scope.type = type;
          $scope.itemType = itemType;
          $scope.headerText = "<h5>Please type in the "+type+" <b>"+name+"</b> to confirm.</h5>";

          $scope.ok = function () {
            $modalInstance.close(name);
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        },
        resolve: {
          name: function() {
            return name;
          },
          type: function() {
            return type;
          },
          itemType: function() {
            return itemType;
          }
        }
      });
    }
  }
}]);
