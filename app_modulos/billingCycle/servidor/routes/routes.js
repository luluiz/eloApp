//declaração do framework web para uso no nodeJS
const express = require('express');

//API de routes
const router = express.Router(); //retorna um middleware

const BillingCycle = require('../model/billingCycle');

module.exports = function (server) {

   //passando o router para o servidor para a url /api
   server.use('/api', router);

   //declarando as rotas da API
   const billingCycleService = require('../services/billingCycleService');

   //definindo todas as url raiz /billingCycle registrando todos os serviços no roteador
   billingCycleService.register(router, '/billingCycles');

   //importando a billingSummaryService de outro modulo para uso nas rotas
   const billingSummaryService = require('../services/billingSummaryService');

   //mapeamento da rota billingSummary
   router.route('/billingSummary').get(billingSummaryService.getSummary);

   return server;
};
