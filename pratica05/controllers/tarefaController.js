const tarefaModel = require('../models/tarefaModel');

function listar(req, res) {
  const resultado = tarefaModel.listar();
  res.json(resultado);
}

function buscarPeloId(req, res) {
  const tarefaId = Number(req.params.tarefaId);
  const resultado = tarefaModel.buscarPeloId(tarefaId);
  if (!resultado) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
  res.json(resultado);
}

function criar(req, res) {
  const tarefa = req.body;
  const resultado = tarefaModel.criar(tarefa);
  res.status(201).json(resultado);
}

function atualizar(req, res) {
  const tarefaId = Number(req.params.tarefaId);
  const tarefaAtualizada = { id: tarefaId, ...req.body };
  const resultado = tarefaModel.atualizar(tarefaAtualizada);
  if (!resultado) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
  res.json(resultado);
}

function remover(req, res) {
  const tarefaId = Number(req.params.tarefaId);
  const resultado = tarefaModel.remover(tarefaId);
  if (!resultado) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
  res.status(204).send();
}

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover,
};
