//importando as configurações do servidor e armazenando na constante server
const server = require('./config/server');

//importando as configurações de conexao com o db (mongodb)
require('./config/database');

// importanto as configurações de rotas
// PROJETO GERAL
require('./config/routes')(server); //passagem de parametros para uma função

// MÓDULO: USUARIO
require('../app_modulos/usuario/servidor/routes/routes')(server);

// MÓDULO: BILLING CYCLE
require('../app_modulos/billingCycle/servidor/routes/routes')(server);

// MÓDULO: DASHBOARD

// MÓDULO: PAGAMENTO
