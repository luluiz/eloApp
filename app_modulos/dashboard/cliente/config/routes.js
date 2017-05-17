//declarando as rotas
(function () {
   angular.module('eloApp').config([
      '$stateProvider', //presente dentro do ui-router servir as navegaçoes
      '$urlRouterProvider', //presente dentro do ui-router
      function ($stateProvider, $urlRouterProvider) { //injeção de dependência do angular
         $stateProvider.state('painel', { //criar os estados da aplicação
            url: "/painel", //atualizar a url para /dashboard
            templateUrl: "dashboard/cliente/view/dashboard.html" //carregar o template que ta dentro
            //de dashboard/dashboard.html jogando dentro do ui-view presente dentro do index.html
         });
         $urlRouterProvider.otherwise('/painel'); //estado padrão caso não encontre os estados
      }
   ]);
})();
