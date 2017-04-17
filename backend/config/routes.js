module.exports = function(app, passport, auth) {
  //User Routes
  var usuarioController = require('../api/controllers/UsuarioController');
  app.get('/usuario/me', usuarioController.me);

  //Setting up the users api
  app.post('/auth/signup', usuarioController.signup);
  app.post('/auth/signin', usuarioController.signin);
  app.get('/auth/signout', usuarioController.signout);

  //Setting the facebook oauth routes
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/#!/signin'
  }), usuarioController.signin);

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/#!/signin'
  }), usuarioController.authCallback);

  //Setting the github oauth routes
  app.get('/auth/github', passport.authenticate('github', {
    failureRedirect: '/#!/signin'
  }), usuarioController.signin);

  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/#!/signin'
  }), usuarioController.authCallback);

  //Setting the twitter oauth routes
  app.get('/auth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/#!/signin'
  }), usuarioController.signin);

  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/#!/signin'
  }), usuarioController.authCallback);

  //Setting the google oauth routes
  app.get('/auth/google', passport.authenticate('google', {
    failureRedirect: '/#!/signin',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }), usuarioController.signin);

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/#!/signin'
  }), usuarioController.authCallback);

  //Finish with setting up the userId param
  app.param('usuarioId', usuarioController.usuario);

  //Article Routes
  var articles = require('../app/controllers/articles');
  app.get('/articles', articles.all);
  app.post('/articles', auth.requiresLogin, articles.create);
  app.get('/articles/:articleId', articles.show);
  app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
  app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

  //Finish with setting up the articleId param
  app.param('articleId', articles.article);

  //Home route
  var index = require('../app/controllers/index');
  app.get('/', index.render);

};
