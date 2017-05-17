//declarando as rotas
(function () {
   angular.module('eloApp').config([
      '$stateProvider', //presente dentro do ui-router servir as navegaçoes
      '$urlRouterProvider', //presente dentro do ui-router
      function ($stateProvider, $urlRouterProvider) { //injeção de dependência do angular
         $stateProvider.state('login', {
            url: "/login", //atualiza a url /login
            templateUrl: "usuario/cliente/views/index.html"
         }).state('registrar', {
            url: "/registrar", //atualiza a url /registrar
            templateUrl: "usuario/cliente/views/registrar.html"
         });

         $urlRouterProvider.otherwise('/login'); //estado padrão caso não encontre os estados
      }
   ]);
})();



// Lembrar de adicionar esse código! aqui e/ou no route do app
// function run($rootScope, $location, authentication) {
//   $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
//     if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
//       $location.path('/');
//     }
//   });
// }
//
// angular
//   .module('meanApp')
//   .config(['$routeProvider', '$locationProvider', config])
//   .run(['$rootScope', '$location', 'authentication', run]);
