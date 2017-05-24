//importando o express
const express = require('express');

//exportando uma função passando o server
module.exports = function (server) {

   //API de routes
   const router = express.Router(); //retorna um middleware

   //passando o router para o servidor para a url /api
   server.use('/api', router);

   return router;
};
