//declaração do middleware para o passport
const passport = require('passport');

//declaração do framework web para uso no nodeJS
const express = require('express');

//API de routes
const router = express.Router(); //retorna um middleware

//declaração do JavaWebToken
const jwt = require('express-jwt');

const jwtAutenticacao = jwt({
   secret: 'udtqcssondodt',
   userProperty: 'payload'
});

const Usuario = require('../models/usuario');

module.exports = function (server) {

   //passando o router para o servidor para a url /api
   server.use('/api', router);

   // passport
   require('../config/passport');
   //  server.use(passport.initialize());

   // autenticacao
   const autenticacaoService = require('../services/autenticacaoService');
   router.post('/usuarios', autenticacaoService.registrar);
   router.post('/login', autenticacaoService.login);

   return server;
};
