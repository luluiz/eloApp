(function () {
   angular.module('eloApp').controller('LoginCtrl', [
      '$http',
      '$location',
      'msgs',
      'usuarioService',
      LoginController
   ]);

   function LoginController($http, $location, msgs, usuarioService) {
      const vm = this;
      const url = 'http://localhost:3003/api/login';

      vm.fazerLogin = function (dadosLogin) {

         //  return $http.post(url, vm.credentials).then(function (response) {
         usuarioService.login(url, vm.dadosLogin).then(function (response) {
            if (response.data.success) {
               msgs.addSuccess('Login realizado com sucesso!');
            } else {
               msgs.addError(response.data.message);
            }

         }).catch(function (response) {
            msgs.addError(response.data.message);
         });
      };
   }
})();
