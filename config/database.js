const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/sistema_senhas'; 

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB com sucesso!');
});

module.exports = mongoose;
