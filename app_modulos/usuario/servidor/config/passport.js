const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//modulo para expor a api para a aplicação
const restful = require('node-restful');
//manipulação do banco de dados mongodb
const mongoose = restful.mongoose;
const Usuario = require('../models/usuario');

passport.use(new LocalStrategy({
      usernameField: 'email'
   },
   function (username, senha, done) {
      Usuario.findOne({
         email: username
      }, function (err, usuario) {
         if (err) {
            return done(err);
         }
         // Retorna se o usuário não foi encontrado
         if (!usuario) {
            return done(null, false, {
               message: 'Usuário não encontrado'
            });
         }
         // Retorna se a senha estiver errada
         if (!usuario.validPassword(senha)) {
            return done(null, false, {
               message: 'Senha errada'
            });
         }
         // Se credentials estão corretas, retorna o objeto usuario
         return done(null, usuario);
      });
   }
));
