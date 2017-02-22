/**
 * @ngdoc function
 * @name app.component:home
 * @description
 * # home
 * Component of the app
 */

(function () {
  'use strict';

  angular
    .module('app')
    .component('home', {
      templateUrl: 'app/components/home/home.html',
      controller: 'HomeController as homeCtrl'
    });
})();
