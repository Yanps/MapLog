/**
 * @ngdoc function
 * @name app.component:user
 * @description
 * # user
 * Component of the app
 */

(function () {
  'use strict';

  angular
    .module('app')
    .component('user', {
      templateUrl: 'app/components/user/user.html',
      controller: 'UserController as userCtrl'
    });
})();
