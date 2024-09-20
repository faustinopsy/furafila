const express = require('express');
const diretorio = require('path');
const app = express();

const mongoose = require('./config/database');
const Senha = require('./models/Senha');

app.use(express.static(diretorio.join(__dirname, 'public')));

app.get('/gerarSenha', async (req, res) => {
  try {
    const lastSenha = await Senha.findOne().sort({ numero: -1 });
    let nextNumero = 1;
    if (lastSenha) {
      nextNumero = lastSenha.numero + 1;
    }
    const novaSenha = new Senha({ numero: nextNumero });
    await novaSenha.save();
    res.send(`Sua senha é: ${nextNumero}`);
  } catch (error) {
    console.error('Erro ao gerar nova senha:', error);
    res.status(500).send('Erro ao gerar nova senha.');
  }
});

app.get('/chamarSenha', async (req, res) => {
  try {
    const proximaSenha = await Senha.findOneAndUpdate(
      { status: 'pendente' },
      { status: 'atendida' },
      { sort: { numero: 1 } }
    );
    if (proximaSenha) {
      res.send(`Próxima senha: ${proximaSenha.numero}`);
    } else {
      res.send('Nenhuma senha pendente.');
    }
  } catch (error) {
    console.error('Erro ao chamar a próxima senha:', error);
    res.status(500).send('Erro ao chamar a próxima senha.');
  }
});

app.get('/fila', async (req, res) => {
  try {
    const senhasPendentes = await Senha.find({ status: 'pendente' }).sort({ numero: 1 });
    res.json(senhasPendentes);
  } catch (error) {
    console.error('Erro ao obter a fila de senhas:', error);
    res.status(500).send('Erro ao obter a fila de senhas.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
