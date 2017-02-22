/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Define routes of the application.
 */

(function () {
  'use strict';
  angular
    .module('app')
    .config(routesConfig);

  /** @ngInject */
  function routesConfig($stateProvider, $urlRouterProvider) {
    var isLoggedIn = ['AuthService', '$location', function (AuthService, $location) {
      var isLoggedIn = AuthService.isLoggedIn();
      var currentURL = $location.url();

      if (isLoggedIn) {
        if (currentURL === '/login' || currentURL === '/') {
          $location.path('/home');
          return;
        }
      }
    }];

    // $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('redirect', {
        url: '/',
        component: 'redirect',
        resolve: {
          isLoggedIn: isLoggedIn
        }
      })

      .state('login', {
        url: '/login',
        component: 'login',
        resolve: {
          isLoggedIn: isLoggedIn
        }
      })

      .state('home', {
        url: '/home',
        component: 'home',
        resolve: {
          isLoggedIn: isLoggedIn
        }
      })

      .state('search', {
        url: '/home/company/:company/page/:page',
        component: 'search',
        resolve: {
          isLoggedIn: isLoggedIn
        }
      })

      .state('user', {
        url: '/user',
        component: 'user',
        resolve: {
          isLoggedIn: isLoggedIn
        }
      });
  }
})();
