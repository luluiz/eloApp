/**
 * Dependencias
 */
const mongoose = require('mongoose');
const passport = require('passport');
const Usuario = mongoose.model('Usuario');

/**
 * Cadastrar
 */
exports.signup = function(req, res) {
  var usuario = new Usuario(req.body);
  var msg = null;

  usuario.provider = 'local';
  usuario.save(function(err) {
    if (err) {
      switch (err.code) {
        case 11000:
        case 11001:
          msg = 'Usuario já existe';
          break;
        default:
          msg = 'Preencher todos os campos obrigatórios';
      }

      return res.send(400, {
        msg: msg
      });
    }
    req.logIn(usuario, function(err) {
      if (err) {
        res.send(400, err);
      } else {
        res.jsonp(usuario);
      }
    });
  });
};

/**
 * Fazer login após a autenticação de passaporte
 */
exports.signin = function(req, res, next) {
  passport.authenticate('local', function(err, usuario, info) {
    if (err || !usuario) {
      res.send(400, info);
    } else {
      req.logIn(usuario, function(err) {
        if (err) {
          res.send(400, err);
        } else {
          res.jsonp(usuario);
        }
      });
    }
  })(req, res, next);
};

/**
 * Logout
 */
exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

/**
 * Enviar Usuario
 */
exports.me = function(req, res) {
  res.jsonp(req.usuario || null);
};

/**
 * Procurar usuário por ID
 */
exports.usuario = function(req, res, next, id) {
  Usuario.findOne({
    _id: id
  }).exec(function(err, usuario) {
    if (err) return next(err);
    if (!usuario) return next(new Error('Falha ao carregar usuário. ID: ' + id));
    req.profile = usuario;
    next();
  });
};
