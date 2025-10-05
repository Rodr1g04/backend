let tarefas = [];
let proximoId = 1;

function listar() {
  return tarefas;
}

function criar({ nome, concluida }) {
  const novaTarefa = {
    id: proximoId++,
    nome,
    concluida
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

function buscarPeloId(id) {
  return tarefas.find(t => t.id === id);
}

function atualizar(tarefaAtualizada) {
  const index = tarefas.findIndex(t => t.id === tarefaAtualizada.id);
  if (index === -1) return null;
  tarefas[index] = tarefaAtualizada;
  return tarefaAtualizada;
}

function remover(id) {
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return null;
  const removida = tarefas.splice(index, 1)[0];
  return removida;
}

function limparTarefas() {
  tarefas = [];
  proximoId = 1;
}

module.exports = {
  listar,
  criar,
  buscarPeloId,
  atualizar,
  remover,
  limparTarefas, // exporta aqui!
};
