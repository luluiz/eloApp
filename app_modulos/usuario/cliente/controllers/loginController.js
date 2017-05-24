(function () {
   angular.module('eloApp').controller('LoginCtrl', [
      '$location',
      '$timeout',
      'msgs',
      'usuarioService',
      '$window',
      LoginController
   ]);

   function LoginController($location, $timeout, msgs, usuarioService, $window) {
      const vm = this;
      const url = 'http://localhost:3003/api/login';

      vm.fazerLogin = function (dadosLogin) {
         usuarioService.login(url, vm.dadosLogin).then(function (response) {
            if (response.data.success) {
               console.log('LOGOU');
               msgs.addSuccess('Login realizado com sucesso!');

               $window.location.href = '/#!/painel';
              //  $timeout(function () {
    //         $location.path('/#!/painel').replace();
    //  }, 2500);
            } else {
               msgs.addError(response.data.message);
            }
         }).catch(function (response) {
            console.log(response);
            msgs.addError('response.data.error');
         });
      };
   }
})();
