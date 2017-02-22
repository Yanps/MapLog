/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */

(function () {
  'use strict';
  angular
    .module('app', [
      'ui.router',
      'ngCookies',
      'ngMessages',
      'angular-datepicker',
      'ui.utils.masks',
      'ngMask'
    ]);
})();
