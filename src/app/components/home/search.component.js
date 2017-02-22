/**
 * @ngdoc function
 * @name app.component:search
 * @description
 * # search
 * Component of the app
 */

(function () {
  'use strict';

  angular
    .module('app')
    .component('search', {
      templateUrl: 'app/components/home/home.html',
      controller: 'HomeController as homeCtrl'
    });
})();
