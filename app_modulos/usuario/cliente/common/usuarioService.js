(function () {
   // autenticacaoService: Nome que deverá ser chamado em outras classes.
   angular.module('eloApp').service('usuarioService', [
      '$http',
      usuarioService
   ]);

   function usuarioService($http) {
      const create = function (url, registrosUsuario) {
         return $http.post(url, registrosUsuario);
      };

      const login = function (url, registrosUsuario) {
         return $http.post(url, registrosUsuario).then(function (response) {
            // código no controlador
         }).catch(function (response) {
            msgs.addError(response.data.message);
         });
      };

      return {
         create: create,
         login: login
      };
   }
})();
