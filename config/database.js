let mongoose = require('mongoose');

const server = '127.0.0.1:27017'; 
const database = 'sistema_senhas'; 

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Mongo conectado');
      })
      .catch((err) => {
        console.error('Erro ao conectar');
      });
  }
}

module.exports = new Database();