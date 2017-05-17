(function () {
   // autenticacaoService: Nome que deverá ser chamado em outras classes.
   angular.module('eloApp').service('autenticacaoService', [
      '$http',
      autenticacaoService
   ]);

   function autenticacaoService($http) {
      const login = function (url, registrosUsuario) {
         return $http.post(url, registrosUsuario);
      };

      return {
         create: create
      };
   }
})();
