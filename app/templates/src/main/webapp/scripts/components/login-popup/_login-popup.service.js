'use strict';

angular.module('<%=angularAppName%>')
    .factory('LoginPopupService', function (Auth, $uibModal) {
        return {
            login: function (credentials, event) {
                event.preventDefault();
                return Auth.login({
                    username: credentials.username,
                    password: credentials.password,
                    rememberMe: credentials.rememberMe
                })
            },
            open: function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'scripts/components/login-popup/login-popup.html',
                    controller: 'LoginController'<% if (enableTranslation) { %>,
                    resolve: {
                      translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                          $translatePartialLoader.addPart('login');
                          return $translate.refresh();
                      }]
                    }<% } %>
                });
            }
        }
    });
