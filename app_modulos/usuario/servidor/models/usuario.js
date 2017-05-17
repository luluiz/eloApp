//modulo para expor a api para a aplicação
const restful = require('node-restful');

//manipulação do banco de dados mongodb
const mongoose = restful.mongoose;

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const usuarioSchema = new mongoose.Schema({
   email: {
      type: String,
      unique: true,
      required: true,
      trim: true
   },
   nome: {
      type: String,
      required: true,
      trim: true
   },
   senha: {
      type: String,
      default: ''
   },
   criado: {
      type: Date,
      default: Date.now
   },
   hash: String,
   salt: String
});

// Segurança: Pré processamento de senha para salvar no banco, encriptação.
usuarioSchema.pre('save', function (next) {
   if (this.senha && this.isModified('senha')) {
      this.salt = crypto.randomBytes(16).toString('base64');
      // Encripitação de senha sha256
      this.senha = this.validPassword(this.senha);
   }
   next();
});

// mudar setSenha.. eh chamado em autenticacao.js
usuarioSchema.methods.setPassword = function (senha) {
   this.salt = crypto.randomBytes(16).toString('base64');
   this.hash = crypto.pbkdf2Sync(senha, new Buffer(this.salt, 'base64'), 1000, 64, 'sha256').toString('base64');
};

// mudar senhaValida.. eh chamado em passport.js
usuarioSchema.methods.validPassword = function (senha) {
   //  const hash = crypto.pbkdf2Sync(senha, this.salt, 1000, 64).toString('hex');
   const hash = crypto.pbkdf2Sync(senha, new Buffer(this.salt, 'base64'), 1000, 64).toString('base64');
   return this.hash === hash;
};

// mudar gerarJwt.. eh chamado em autenticacao.js
usuarioSchema.methods.generateJwt = function () {
   const expiry = new Date();
   expiry.setDate(expiry.getDate() + 7);

   return jwt.sign({
      _id: this._id,
      email: this.email,
      nome: this.nome,
      exp: parseInt(expiry.getTime() / 1000),
   }, "udtqcssondodt"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

usuarioSchema.methods.compararSenhas = function (senha) {
   return bcrypto.compareSync(senha, this.senha);
};

// mongoose.model('Usuario', usuarioSchema);
module.exports = restful.model('Usuario', usuarioSchema);
