/**
 * @ngdoc function
 * @name app.controller:HomeController
 * # HomeController
 * Controller of the app
 */

(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['CompaniesService', 'NotesService', '$timeout', '$location', '$stateParams', '$window', '$log'];

  function HomeController(CompaniesService, NotesService, $timeout, $location, $stateParams, $window, $log) {
    var vm = this;
    var $modal = $window.document.getElementById('modal-edit');

    vm.currentCompany = $stateParams.company;
    vm.currentPage = $stateParams.page;
    vm.disabled = false;
    vm.loading = false;
    vm.loadingModal = false;
    vm.disabledModal = false;
    vm.searchNotes = searchNotes;
    vm.updateNote = updateNote;
    vm.openModal = openModal;
    vm.closeModal = closeModal;
    vm.modalData = {};
    vm.getNotes = function (companyName, page, size) {
      setLoader();
      $timeout(function () {
        getNotes(companyName, page, size);
      }, 500);
    };

    vm.datepicker = {
      options: {
        // Strings and translations
        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sext', 'Sábado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        showMonthsShort: undefined,
        showWeekdaysFull: undefined,

        // Buttons
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Fechar',

        // Accessibility labels
        labelMonthNext: 'Próximo mês',
        labelMonthPrev: 'Mês anterior',
        labelMonthSelect: 'Selecione o mês',
        labelYearSelect: 'Selectione o ano',

        // Formats
        format: 'dd/mm/yyyy',
        formatSubmit: undefined,
        hiddenPrefix: undefined,
        hiddenSuffix: '_submit',
        hiddenName: undefined,

        // Editable input
        editable: undefined,

        // Dropdown selectors
        selectYears: undefined,
        selectMonths: undefined,

        // First day of the week
        firstDay: undefined,

        // Date limits
        min: undefined,
        max: undefined,

        // Disable dates
        disable: undefined,

        // Root picker container
        container: undefined,

        // Hidden input container
        containerHidden: undefined,

        // Close on a user action
        closeOnSelect: true,
        closeOnClear: true,

        // Events
        onStart: undefined,
        onRender: undefined,
        onOpen: undefined,
        onClose: undefined,
        onSet: undefined,
        onStop: undefined,

        // Classes
        klass: {
          // The element states
          input: 'picker__input',
          active: 'picker__input--active',

          // The root picker and states *
          picker: 'picker',
          opened: 'picker--opened',
          focused: 'picker--focused',

          // The picker holder
          holder: 'picker__holder',

          // The picker frame, wrapper, and box
          frame: 'picker__frame',
          wrap: 'picker__wrap',
          box: 'picker__box',

          // The picker header
          header: 'picker__header',

          // Month navigation
          navPrev: 'picker__nav--prev',
          navNext: 'picker__nav--next',
          navDisabled: 'picker__nav--disabled',

          // Month & year labels
          month: 'picker__month',
          year: 'picker__year',

          // Month & year dropdowns
          selectMonth: 'picker__select--month',
          selectYear: 'picker__select--year',

          // Table of dates
          table: 'picker__table',

          // Weekday labels
          weekdays: 'picker__weekday',

          // Day states
          day: 'picker__day',
          disabled: 'picker__day--disabled',
          selected: 'picker__day--selected',
          highlighted: 'picker__day--highlighted',
          now: 'picker__day--today',
          infocus: 'picker__day--infocus',
          outfocus: 'picker__day--outfocus',

          // The picker footer
          footer: 'picker__footer',

          // Today, clear, & close buttons
          buttonClear: 'picker__button--clear',
          buttonClose: 'picker__button--close',
          buttonToday: 'picker__button--today'
        }
      }
    };

    getCompaniesList();

    function getCompaniesList() {
      CompaniesService.getCompaniesList().then(function (resp) {
        vm.companies = resp.data;

        if (vm.currentCompany) {
          setCurrentCompany(vm.currentCompany, vm.companies);
        }
      }, function () {
        $log.error('Não foi possível obter a lista de empresas');
      });
    }

    function searchNotes(companyId) {
      $location.path('/home/company/' + companyId + '/page/1');
      return;
    }

    function setCurrentCompany(currentCompany, companies) {
      for (var i = 0; i < companies.length; i += 1) {
        if (currentCompany === companies[i].id.toString()) {
          vm.company = parseInt(currentCompany, 10);
          getNotes(vm.company, vm.currentPage, 20);
        }
      }
    }

    function getNotes(companyId, page, size) {
      setLoader();
      $timeout(function () {
        NotesService.getNotesList(companyId, page, size).then(function (resp) {
          // Success
          vm.notes = resp.data.notaList;
          generatePagination(vm.currentPage, size, resp.data.totalNotas);
          if (!vm.notes || vm.notes.length === 0) {
            vm.message = 'Não foram encontradas notas p/ essa empresa';
          }
        }, function () {
          // Error
          vm.error = true;
        }).then(function () {
          // Done
          removeLoader();
        });
      }, 500);
    }

    function generatePagination(currentPage, pageSize, totalItems) {
      var page = parseInt(currentPage, 10);
      var items = parseInt(totalItems, 10);
      var size = parseInt(pageSize, 10);
      var totalPages = Math.ceil(items / size);
      var company = vm.currentCompany;

      vm.pagination = {
        firstPage: '/#!/home/company/' + company + '/page/1',
        isFirstPage: page === 1,
        isLastPage: page === totalPages,
        lastPage: '/#!/home/company/' + company + '/page/' + totalPages,
        singlePage: totalPages === 1,
        twoPages: totalPages === 2,
        previousLink: '/#!/home/company/' + company + '/page/' + (page - 1),
        nextLink: '/#!/home/company/' + company + '/page/' + (page + 1),

        pageOne: function () {
          if (vm.pagination.isLastPage) {
            return vm.pagination.pageTwo() - 1;
          }
          if (page > 1) {
            return page - 1;
          }
          return 1;
        },

        pageTwo: function () {
          if (vm.pagination.isLastPage) {
            return page - 1;
          }
          if (page > 1) {
            return page;
          }
          return 2;
        },

        pageThree: function () {
          if (vm.pagination.isLastPage) {
            return page;
          }
          if (page > 1) {
            return page + 1;
          }
          return 3;
        },

        pageLink: function (page) {
          return '/#!/home/company/' + company + '/page/' + vm.pagination['page' + page]();
        }
      };
    }

    function setLoader() {
      vm.loading = true;
      vm.disabled = true;
    }

    function removeLoader() {
      vm.loading = false;
      vm.disabled = false;
    }

    function updateNote(note, formData) {
      var updatedNote = angular.copy(note);
      updatedNote.expectativaColeta = formData.expectativaColeta || null;
      updatedNote.dataColeta = formData.dataColeta || null;
      updatedNote.expectativaEntrega = formData.expectativaEntrega || null;
      updatedNote.dataEntrega = formData.dataEntrega || null;

      vm.loadingModal = true;
      vm.disabledModal = true;

      NotesService.updateNote(updatedNote).then(function () {
        vm.successModal = true;
      }, function () {
        vm.errorModal = true;
      }).then(function () {
        vm.loadingModal = false;
        vm.disabledModal = false;
        $timeout(function () {
          if ($modal.classList.contains('is-active')) {
            closeModal();
          }
        }, 3000);
      });
    }

    function openModal(note) {
      vm.currentNote = note;
      vm.modalData = {
        expectativaColeta: clearDateString(note.expectativaColeta) || '',
        dataColeta: clearDateString(note.dataColeta) || '',
        expectativaEntrega: clearDateString(note.expectativaEntrega) || '',
        dataEntrega: clearDateString(note.dataEntrega) || ''
      };
      $modal.classList.add('is-active');
    }

    function closeModal() {
      $modal.classList.remove('is-active');
      vm.errorModal = false;
      vm.successModal = false;
      vm.loadingModal = false;
      $window.location.reload();
    }

    function clearDateString(date) {
      if (!date) {
        return date;
      }
      var str = date.substr(0, date.indexOf('T')).split('-');
      var newStr = str[2] + '/' + str[1] + '/' + str[0];
      return newStr;
    }

    $window.document.querySelector('.modal-background').addEventListener('click', function () {
      closeModal();
    }, false);
  }
})();
