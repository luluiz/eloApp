(function () {
   //declarando o angular com nome da aplicação e as depedências
   angular.module('eloApp', [
      'ui.router', //responsável pelas rotas
      'ngAnimate', //responsável pelas animações
      'toastr' //responsável pelas mensagens
   ]).config([
      '$stateProvider', //presente dentro do ui-router servir as navegaçoes
      '$urlRouterProvider', //presente dentro do ui-router
      function ($stateProvider, $urlRouterProvider) { //injeção de dependência do angular
         $stateProvider.state('main', { //criar os estados da aplicação
            // url: "/main",
            // templateUrl: "app/index.html", //carregar o template que ta dentro // quano usa VIEWS (abaixo) não pode add templateUrl aqui e dentro de views
            abstract: true,
            // template: '<div ui-view="header"></div> <div ui-view="content"></div> <div ui-view="menu"></div>',
            views: {
               'header': {
                  // template: '<div class="wrapper"><header class="main-header" ></header></div>',
                  templateUrl: 'app/views/header.html'
               },
               'content':{
                //  template: '<div ui-view></div>'
               },
               'menu': {
                  // template: '<hr /> footer',
                  templateUrl: 'app/views/menu.html'
               }
            }
            //de dashboard/dashboard.html jogando dentro do ui-view presente dentro do index.html
         });
         $urlRouterProvider.otherwise('/login'); //estado padrão caso não encontre os estados
      }
   ]);

})();
