//declarando as rotas
(function () {
   angular.module('eloApp').config([
      '$stateProvider', //presente dentro do ui-router servir as navegaçoes
      '$urlRouterProvider', //presente dentro do ui-router
      function ($stateProvider, $urlRouterProvider) { //injeção de dependência do angular
         $stateProvider.state('main.painel', { //criar os estados da aplicação
            //'main.painel' state matches "/painel". The urls were not combined because ^ was used. Else: without ^ 'main/painel'
            url: "^/painel", //atualizar a url para /dashboard
            templateUrl: "dashboard/cliente/views/dashboard.html" //carregar o template que ta dentro
            //de dashboard/dashboard.html jogando dentro do ui-view presente dentro do index.html
         });
         $urlRouterProvider.otherwise('/main.painel'); //estado padrão caso não encontre os estados
      }
   ]);
})();
