/**
 * @ngdoc service
 * @name app.NotesServices
 * @description
 * # NotesServices
 * Service in the app.
 */

(function () {
  'use strict';

  angular
    .module('app')
    .service('NotesService', NotesService);

  NotesService.$inject = ['APIService'];

  function NotesService(APIService) {
    var service = {
      getNotesList: getNotesList,
      updateNote: updateNote
    };

    return service;

    function getNotesList(companyID, page, size) {
      var headers = {
        skip: (page - 1) * size,
        take: size
      };
      return APIService.get('Notas/PorEmpresa/' + companyID, headers);
    }

    function updateNote(note) {
      return APIService.put('Notas/Update/' + note.id, note);
    }
  }
})();
