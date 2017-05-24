//declarando as rotas de PAGAMENTOS
(function () {
   angular.module('eloApp').config([
      '$stateProvider', //presente dentro do ui-router servir as navegaçoes
      '$urlRouterProvider', //presente dentro do ui-router
      function ($stateProvider, $urlRouterProvider) { //injeção de dependência do angular
         $stateProvider.state('main.pagamentos', { //criar os estados da aplicação
            //'main.pagamentos' state matches "/pagamentos". The urls were not combined because ^ was used. Else: without ^ 'main/pagamentos'
            url: "^/pagamentos", //atualizar a url para /dashboard
            templateUrl: "pagamento/cliente/views/pagamentos.html" //carregar o template que ta dentro
         });
         $urlRouterProvider.otherwise('/main.painel'); //estado padrão caso não encontre os estados
      }
   ]);
})();
