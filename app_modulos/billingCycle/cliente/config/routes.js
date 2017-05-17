//declarando as rotas
(function () {
   angular.module('eloApp').config([
      '$stateProvider', //presente dentro do ui-router servir as navegaçoes
      '$urlRouterProvider', //presente dentro do ui-router
      function ($stateProvider, $urlRouterProvider) { //injeção de dependência do angular
         $stateProvider.state('billingCycle', {
            url: "/billingCycles?page", //atualiza a url /billingCycles
            templateUrl: "billingCycle/cliente/view/tabs.html" //carregar o template que ta dentro
            //de billingCycle/tabs.html jogando dentro do ui-view presente dentro do
            //index.html
         });

         $urlRouterProvider.otherwise('/dashboard'); //estado padrão caso não encontre os estados
      }
   ]);
})();
