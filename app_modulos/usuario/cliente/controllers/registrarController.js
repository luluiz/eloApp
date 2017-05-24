(function () {
   angular.module('eloApp').controller('RegistrarCtrl', [
      '$location',
      '$timeout',
      'msgs',
      'usuarioService',
      RegistrarController //referência da função declarada abaix
   ]);

   function RegistrarController($location, $timeout, msgs, usuarioService) {
      const vm = this;
      const url = 'http://localhost:3003/api/usuarios';

      vm.onSubmit = function (registrosUsuario) {
         // $http.post(url, vm.registrosUsuario).then(function (response) {  // Lembrar de injetetar dependencia $http em cima
         usuarioService.create(url, vm.registrosUsuario).then(function (response) {
            if (response.data.success) {
               msgs.addSuccess(response.data.message);

               // Redireciona para login após 1500 ms NAO TA FUNCIONANDO
               $timeout(function () {
                  $location.path('/#!/login').replace();
               }, 1500);
            } else {
               msgs.addError(response.data.message);
            }

         }).catch(function (response) {
            msgs.addError(response.data.message);
         });

      };
   }
})();
