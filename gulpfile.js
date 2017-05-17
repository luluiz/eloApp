//importando o modulo gulp responsável pelo build (fazedor de tarefas)
const gulp = require('gulp');

//importando o modulo gulp-util
const util = require('gulp-util');

// Sequencia de tarefas. Mas o gulp.start está resolvendo...
// const runSequence = require('run-sequence').use(gulp);

//importando as gulpTasks criadas no modulo (arquivo) deps.js
require('./gulpTasks/app');
require('./gulpTasks/deps');
require('./gulpTasks/server');

// Tarefa para rodar o backend: configs, mongodb, routes
gulp.task('backend', function() {
  require('./app_backend/loader');
});

//declaração da task padrão sempre que for executado o comando gulp no console
gulp.task('default', function() {
  if (util.env.production) { //se a chamada do gulp conter a flag production
    gulp.start('deps', 'app', 'backend'); //chama duas tasks: deps e app
  } else { //se for chamada para o desenvolvimento
    gulp.start('deps', 'app', 'server', 'backend'); //iniciar as tres tasks: deps, app e server
    // runSequence('deps', 'app', 'server', 'backend');
  }
});
