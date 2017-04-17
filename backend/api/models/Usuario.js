/**
 * Module dependencies.
 */
//modulo para expor a api para a aplicação
const restful = require('node-restful');

//manipulação do banco de dados mongodb
const mongoose = restful.mongoose;

//
const crypto = require('crypto');

//
const _ = require('underscore');

//
const authTypes = ['github', 'twitter', 'facebook', 'google'];


/**
 *  Schema: Usuario
 */
const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String
  },
  email: {
    type: String
  },
  usuario: {
    type: String,
    equired: [true, 'Informe o nome do usuário.']
  },
  senha_hash: {
    type: String
  },
  salt: {
    type: String
  },
  facebook: {},
  twitter: {},
  github: {},
  google: {}
});

/**
 * Virtual
 */
UsuarioSchema.virtual('senha').set(function(senha) {
  this._senha = senha;
  this.salt = this.makeSalt();
  this.senha_hash = this.encryptPassword(senha);
}).get(function() {
  return this._senha;
});

/**
 * Validações
 */
var validatePresenceOf = function(value) {
  return value && value.length;
};

// As 4 validações abaixo só se aplicam se você está se inscrevendo tradicionalmente
UsuarioSchema.path('nome').validate(function(nome) {
  // Se você estiver autenticando por qualquer uma das estratégias oauth, não validar
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return nome.length;
}, 'Nome é um campo obrigatório.');

UsuarioSchema.path('email').validate(function(email) {
  // Se você estiver autenticando por qualquer uma das estratégias oauth, não validar
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return email.length;
}, 'Email é um campo obrigatório.');

UsuarioSchema.path('usuario').validate(function(usuario) {
  // Se você estiver autenticando por qualquer uma das estratégias oauth, não validar
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return usuario.length;
}, 'Usuário é um campo obrigatório.');

UsuarioSchema.path('senha_hash').validate(function(senha_hash) {
  // Se você estiver autenticando por qualquer uma das estratégias oauth, não validar
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return senha_hash.length;
}, 'Senha é um campo obrigatório.');


/**
 * Pre-save hook
 */
UsuarioSchema.pre('save', function(next) {
  if (!this.isNew)
    return next();

  if (!validatePresenceOf(this.senha) && authTypes.indexOf(this.provider) === -1)
    next(new Error('Senha Inválida'));
  else
    next();
});

/**
 * Métodos
 */
UsuarioSchema.methods = {
  /**
   * Autenticar - Verifica se as senhas são iguais
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.senha_hash;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encriptar senha
   *
   * @param {String} senha
   * @return {String}
   * @api public
   */
  encryptPassword: function(senha) {
    if (!senha) return '';
    return crypto.createHmac('sha1', this.salt).update(senha).digest('hex');
  }
};


//exportando o model BillingCycle do schema billingCycleSchema
module.exports = restful.model('Usuario', UsuarioSchema);
