/**
 * @ngdoc function
 * @name app.controller:UserController
 * # UserController
 * Controller of the app
 */

(function () {
  'use strict';

  angular
      .module('app')
      .controller('UserController', UserController);

  UserController.$inject = ['AuthService', 'CompaniesService', '$timeout', '$location', 'UserService'];

  function UserController(AuthService, CompaniesService, $timeout, $location, UserService) {
    var vm = this;

    vm.useremail = UserService.getUseremail();
    vm.username = UserService.getUsername();

    getCompaniesList();

    function getCompaniesList() {
      CompaniesService.getCompaniesList().then(function (resp) {
        vm.companies = resp.data;
      });
    }
  }
})();
