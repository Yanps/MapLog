/**
 * @ngdoc function
 * @name app.controller:HeaderController
 * # HeaderController
 * Controller of the app
 */

(function () {
  'use strict';
  angular
  .module('app')
  .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['AuthService', '$cookies', '$location'];

  function HeaderController(AuthService, $cookies, $location) {
    var vm = this;

    vm.getUsername = getUserName;
    vm.logout = logout;
    vm.currentPath = $location.path();

    function getUserName() {
      return decodeURI($cookies.get('MAPLOG_NAME'));
    }

    function logout() {
      AuthService.logout();
    }
  }
})();
