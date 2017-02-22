/**
 * @ngdoc service
 * @name app.CompaniesService
 * @description
 * # CompaniesService
 * Service in the app.
 */

(function () {
  'use strict';
  angular
    .module('app')
    .service('CompaniesService', CompaniesService);

  CompaniesService.$inject = ['APIService', '$cookies'];

  function CompaniesService(APIService, $cookies) {
    var service = {
      getCompaniesList: getCompaniesList
    };

    return service;

    function getCompaniesList() {
      var companiesList = decodeURI($cookies.get('MAPLOG_COMPANIES'));
      var headers = {
        ListaEmpresas: companiesList
      };
      return APIService.get('empresa', headers);
    }
  }
})();
