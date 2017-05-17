//importando o express
const express = require('express');

//exportando uma função passando o server
module.exports = function (server) {

   //API de routes
   const router = express.Router(); //retorna um middleware

   //passando o router para o servidor para a url /api
   server.use('/api', router);

   //declarando as rotas da API
   const billingCycleService = require('../../app_modulos/billingCycle/servidor/billingCycleService');

   //definindo todas as url raiz /billingCycle registrando todos os serviços no roteador
   billingCycleService.register(router, '/billingCycles');

   //importando a billingSummaryService de outro modulo para uso nas rotas
   const billingSummaryService = require('../../app_modulos/billingCycle/servidor/billingSummaryService');

   //mapeamento da rota billingSummary
   router.route('/billingSummary').get(billingSummaryService.getSummary);

   // Usuario Service
  //  const usuarioService = require('../../app_modulos/usuario/servidor/services/usuarioService');
  //  usuarioService.register(router, '/usuarios');

   //  // AutenticacaoController PerfilController
   //  const perfilService = require('../../app_modulos / usuario / servidor / services / perfilService ');
   //  const autenticacaoService = require('../../app_modulos/usuario/servidor/services/autenticacaoService');
   //  router.post('/login', autenticacaoService.login);
   //  router.get('/perfil', auth, perfilService.profileRead);

   return router;
};
