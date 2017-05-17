//importando as configurações do servidor e armazenando na constante server
const server = require('./config/server');

//importando as configurações de conexao com o banco de dados mongodb
require('./config/database');

//importando as configurações de rotas
require('./config/routes')(server); //passagem de parametros para uma função
//que é retornada pelo modulo routes.js

//importando configurações de rotas dos modulos
require('../app_modulos/usuario/servidor/routes/routes')(server);
