'use strict';

angular.module('<%=angularAppName%>')
    .controller('LoginController', function ($rootScope, $scope, $state, $timeout, Auth, $uibModalInstance) {
        $scope.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        $scope.authenticationError = false;

        $timeout(function (){angular.element('[ng-model="username"]').focus();});
        $scope.login = function (event) {
            event.preventDefault();
            Auth.login({
                username: $scope.credentials.username,
                password: $scope.credentials.password,
                rememberMe: $scope.credentials.rememberMe
            }).then(function () {
                $scope.authenticationError = false;
                if($uibModalInstance){
                  $uibModalInstance.close();
                } else {
                  if ($rootScope.previousStateName === 'register') {
                      $state.go('home');
                  } else {
                      $rootScope.back();
                  }
                }
            }).catch(function () {
                $scope.authenticationError = true;
            });
        };
        $scope.cancel = function () {
          $scope.credentials = {
              username: null,
              password: null,
              rememberMe: true
          };
          $scope.authenticationError = false;
          $uibModalInstance.dismiss('cancel');
        };
    });
