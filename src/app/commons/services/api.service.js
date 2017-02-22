/**
 * @ngdoc service
 * @name app.APIService
 * @description
 * # APIService
 * Service in the app.
 */

(function () {
  'use strict';
  angular
  .module('app')
  .service('APIService', APIService);

  APIService.$inject = ['$http', '$q'];

  function APIService($http, $q) {
    var url = 'http://maplogservice.azurewebsites.net/Api/v1/';

    var promise = function (method, endpoint, configObj) {
      var resource = url + endpoint;
      var config = {
        method: method,
        url: resource,
        headers: configObj.headers || '',
        data: configObj.data || ''
      };

      return $http(config).then(function (resp) {
        return resp;
      }, function (resp) {
        return $q.reject(resp);
      });
    };

    var service = {
      get: get,
      post: post,
      put: put
    };

    return service;

    function get(endpoint, headers) {
      return promise('GET', endpoint, {headers: headers});
    }

    function post(endpoint, data, headers) {
      return promise('POST', endpoint, {header: headers, data: data});
    }

    function put(endpoint, data, headers) {
      return promise('PUT', endpoint, {header: headers, data: data});
    }
  }
})();
