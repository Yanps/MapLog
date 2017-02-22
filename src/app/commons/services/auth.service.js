/**
 * @ngdoc service
 * @name app.AuthService
 * @description
 * # AuthService
 * Service in the app.
 */

(function () {
  'use strict';
  angular
    .module('app')
    .service('AuthService', AuthService);

  AuthService.$inject = ['$location', '$cookies', 'APIService'];

  function AuthService($location, $cookies, APIService) {
    var guid = function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    var service = {
      isLoggedIn: isLoggedIn,
      login: login,
      setUserCookies: setUserCookies,
      logout: logout
    };

    return service;

    function isLoggedIn() {
      var token = $cookies.get('MAPLOG_TOKEN');
      if (!token) {
        $location.path('/login');
        return false;
      }
      return true;
    }

    function login(user) {
      return APIService.post('Usuario/Login', user);
    }

    function setUserCookies(id, name, companies, email) {
      $cookies.put('MAPLOG_TOKEN', guid());
      $cookies.put('MAPLOG_ID', id);
      $cookies.put('MAPLOG_NAME', name);
      $cookies.put('MAPLOG_COMPANIES', companies);
      $cookies.put('MAPLOG_EMAIL', email);
    }

    function logout() {
      $cookies.remove('MAPLOG_TOKEN');
      $cookies.remove('MAPLOG_ID');
      $cookies.remove('MAPLOG_NAME');
      $cookies.remove('MAPLOG_COMPANIES');
      $cookies.remove('MAPLOG_EMAIL');
      $location.path('/');
    }
  }
})();
