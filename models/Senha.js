const mongoose = require('mongoose');

const senhaSchema = new mongoose.Schema({
  numero: Number,
  status: { type: String, default: 'pendente' },
  data: { type: Date, default: Date.now },
});

const Senha = mongoose.model('Senha', senhaSchema);
module.exports = Senha;
