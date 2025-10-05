const supertest = require('supertest');
const app = require('../app');
const { limparTarefas } = require('../models/tarefaModel');

const request = supertest(app);

describe('Tarefas API', () => {
  let tarefaId;

  beforeEach(() => {
    limparTarefas(); 
  });

  test('deve criar uma nova tarefa e retornar status 201 com JSON', async () => {
    const novaTarefa = { nome: 'Estudar Node', concluida: false };
    const res = await request.post('/tarefas')
      .send(novaTarefa)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe(novaTarefa.nome);
    expect(res.body.concluida).toBe(false);

    tarefaId = res.body.id; 
  });

  test('deve retornar status 200 e tarefa correspondente em JSON', async () => {
    const tarefa = { nome: 'Estudar Node', concluida: false };
    const { body } = await request.post('/tarefas').send(tarefa);
    const res = await request.get(`/tarefas/${body.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', body.id);
    expect(res.body).toHaveProperty('nome', tarefa.nome);
  });

  test('deve retornar status 404 e JSON para tarefa não encontrada', async () => {
    const res = await request.get('/tarefas/999');

    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('error', 'Tarefa não encontrada');
  });

  test('deve atualizar uma tarefa existente e retornar status 200 com JSON', async () => {
    const tarefa = { nome: 'Estudar Node', concluida: false };
    const { body } = await request.post('/tarefas').send(tarefa);

    const atualizacao = { nome: 'Estudar Node e Express', concluida: true };
    const res = await request.put(`/tarefas/${body.id}`).send(atualizacao);

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe(atualizacao.nome);
    expect(res.body.concluida).toBe(true);
  });

  test('deve retornar status 404 e JSON para atualização de tarefa não encontrada', async () => {
    const res = await request.put('/tarefas/999').send({ nome: 'Novo nome' });

    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('error', 'Tarefa não encontrada');
  });

  test('deve deletar uma tarefa existente e retornar status 204 sem conteúdo', async () => {
    const { body } = await request.post('/tarefas').send({ nome: 'Estudar', concluida: false });
    const res = await request.delete(`/tarefas/${body.id}`);

    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({});
  });

  test('deve retornar status 404 e JSON para tarefa não encontrada na exclusão', async () => {
    const res = await request.delete('/tarefas/999');

    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('error', 'Tarefa não encontrada');
  });
});
