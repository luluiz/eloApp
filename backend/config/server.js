//Definição da porta de comunicação
const port = 3001;

//declaração do middleware que serve para fazer o "parser" ou a interpretação do corpo da requisição
const bodyParser = require('body-parser');

//declaração do framework web para uso no nodeJS
const express = require('express');

//declaração do servidor passando o express
const server = express();

//declaração da permissão de Cross Origin Request para a API
const allowCors = require('./cors');

//uso da urlencoded para interpretar as requisições dos formulários
server.use(bodyParser.urlencoded({
  extended: true
}))

//interpretar o conteudo JSON de todas as requisições
server.use(bodyParser.json());

//declarando o middleware para uso pela API
server.use(allowCors);

server.listen(port, function() {
  console.log(`backend_elo está rodando na porta ${port}`)
})

//exportando o servidor
module.exports = server;
