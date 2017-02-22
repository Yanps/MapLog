/**
 * @ngdoc function
 * @name app.component:login
 * @description
 * # login
 * Component of the app
 */

(function () {
  'use strict';

  angular
    .module('app')
    .component('login', {
      templateUrl: 'app/components/login/login.html',
      controller: 'LoginController as loginCtrl'
    });
})();
