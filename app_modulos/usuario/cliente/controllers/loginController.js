(function () {
   angular.module('eloApp').controller('LoginCtrl', [
      '$http',
      '$location',
      'msgs',
      'autenticacao',
      LoginController
   ]);

   function LoginController($http, $location, msgs, autenticacao) {
      const vm = this;
      const url = 'http://localhost:3003/api/login';

      vm.credentials = {
         email: "",
         senha: ""
      };

      vm.onSubmit = function () {
         console.log(vm.credentials);
         return $http.post(url, vm.credentials).then(function (response) {
            console.log('LOGOU');
            autenticacao.saveToken(response.token);
            msgs.addSuccess('Login realizado com sucesso!');
         }).catch(function (response) {
            console.log('ERROOO');
            msgs.addError(response.data.errors);
         });

      };
   }
})();
