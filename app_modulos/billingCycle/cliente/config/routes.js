//declarando as rotas
(function () {
   angular.module('eloApp').config([
      '$stateProvider', //presente dentro do ui-router servir as navegaçoes
      '$urlRouterProvider', //presente dentro do ui-router
      function ($stateProvider, $urlRouterProvider) { //injeção de dependência do angular
         $stateProvider.state('main.billingCycle', {
            //'main.billingCycle' state matches "/billingCycle". The urls were not combined because ^ was used. Else: without ^ 'main/billingCycle'
            url: "^/billingCycles?page", //atualiza a url /billingCycles
            templateUrl: "billingCycle/cliente/view/tabs.html" //carregar o template que ta dentro
            //de billingCycle/tabs.html jogando dentro do ui-view presente dentro do
            //index.html
         });
         $urlRouterProvider.otherwise('/main.painel'); //estado padrão caso não encontre os estados
      }
   ]);
})();
