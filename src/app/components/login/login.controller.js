/**
 * @ngdoc function
 * @name app.controller:LoginController
 * # LoginController
 * Controller of the app
 */

(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['AuthService', '$timeout', '$location'];

  function LoginController(AuthService, $timeout, $location) {
    var vm = this;

    vm.user = {};
    vm.error = false;
    vm.loading = false;
    vm.disabled = false;
    vm.closeError = close;
    vm.login = function (user) {
      setLoader();
      $timeout(function () {
        login(user);
      }, 1000);
    };

    function login(user) {
      AuthService.login(user).then(function (resp) {
        // Success
        var data = resp.data;
        AuthService.setUserCookies(data.id, data.nome, data.listaEmpresas, data.login);
        $location.path('/home');
      }, function () {
        // Error
        vm.error = true;
      }).then(function () {
        // Done
        removeLoader();
      });
    }

    function close() {
      vm.error = false;
    }

    function setLoader() {
      vm.loading = true;
      vm.disabled = true;
    }

    function removeLoader() {
      vm.loading = false;
      vm.disabled = false;
    }
  }
})();
