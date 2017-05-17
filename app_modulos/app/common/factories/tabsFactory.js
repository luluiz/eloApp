//declaração da função autoinvocada para fugir do escopo global
(function() {
    angular.module('eloApp').factory('tabs', [TabsFactory]);
    //tabs aponta para o metodo TabsFactory declarada abaixo
    function TabsFactory() {

        function show(owner, { //declarando os parametros do metodo através do objeto criado pelas {} 
            //usando o operador destruction
            tabList = false,
            tabCreate = false,
            tabView = false,
            tabUpdate = false,
            tabDelete = false
        }) { //corpo do método
            owner.tabList = tabList;
            owner.tabCreate = tabCreate;
            owner.tabView = tabView;
            owner.tabUpdate = tabUpdate;
            owner.tabDelete = tabDelete;
        }

        return { show }; //retornando o objeto: metodo criado acima 
    }
})();