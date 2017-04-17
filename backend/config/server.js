//Definição da porta de comunicação
const port = 3001;

//declaração do middleware que serve para fazer o "parser" ou a interpretação do corpo da requisição
const bodyParser = require('body-parser');

//declaração do framework web para uso no nodeJS
const express = require('express');

//declaração do servidor passando o express
const server = express();

server.use(bodyParser.urlencoded({
  extended: true
}))

server.use(bodyParser.json())

server.listen(port, function() {
  console.log(`backend_elo está rodando na porta ${port}`)
})
