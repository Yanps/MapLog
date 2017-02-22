/**
 * @ngdoc service
 * @name app.UserService
 * @description
 * # UserService
 * Service in the app.
 */

(function () {
  'use strict';

  angular
    .module('app')
    .service('UserService', UserService);

  UserService.$inject = ['APIService', '$cookies'];

  function UserService(APIService, $cookies) {
    var service = {
      getUsername: getUsername,
      getUseremail: getUseremail
    };

    return service;

    function getUsername() {
      return $cookies.get('MAPLOG_NAME');
    }

    function getUseremail() {
      return $cookies.get('MAPLOG_EMAIL');
    }
  }
})();
