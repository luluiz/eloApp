const passport = require('passport');
const mongoose = require('mongoose');
// const Usuario = mongoose.model('Usuario');
const Usuario = require('../models/usuario');

const sendJSONresponse = function (res, status, content) {
   res.status(status);
   res.json(content);
};

module.exports.registrar = function (req, res) {
   console.log('ENTROU AUTENTICACAOSERVICE.REGISTER BACKEND');
   const usuario = new Usuario();

   usuario.nome = req.body.nome;
   usuario.email = req.body.email;
   usuario.senha = req.body.senha;
   usuario.senhaConfirmacao = req.body.senhaConfirmacao;

   //  usuario.setPassword(req.body.senha);

   if (req.body.nome === null || req.body.nome === '' ||
      req.body.email === null || req.body.email === '' ||
      req.body.senha === null || req.body.senha === '' ||
      req.body.senhaConfirmacao === null || req.body.senhaConfirmacao === '') {
      // res.send('Os campos Nome, Email e Senha são obrigatórios.');
      res.json({
         success: false,
         message: 'Os campos Nome, Email e Senha são obrigatórios.'
      });
   } else if (req.body.senha != req.body.senhaConfirmacao) {
      res.json({
         success: false,
         message: 'A confirmação de senha não confere.'
      });
   } else {
      usuario.save(function (err) {
         if (err) {
            res.json({
               success: false,
               message: 'Os campos Nome, Email e Senha são obrigatórios.'
            });
         } else {
            res.json({
               success: true,
               message: 'Usuário registrado com sucesso!'
            });
         }
      });
   }
};

module.exports.login = function (req, res) {
   Usuario.findOne({
      email: req.body.email
   }).select('email senha').exec(function (err, usuario) {
      if (err) throw err;

      if (!usuario) {
         res.json({
            success: false,
            message: 'Não foi possível autenticar o usuário. E-mail não cadastrado.'
         });
      } else if (usuario) {

         if (req.body.senha) {
            var senhaValida = usuario.compararSenhas(req.body.senha);
            if (!senhaValida) {
               res.json({
                  success: false,
                  message: 'Não foi possível autenticar o usuário, senha inválida.'
               });
            } else {
               res.json({
                  success: true,
                  message: 'Usuário autenticado com sucesso.'
               });
            }
         } else {
            res.json({
               success: false,
               message: 'Digite a senha.'
            });
         }
      }
   });
};
