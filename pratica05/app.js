const express = require('express');
const logger = require('morgan');
const tarefaRouter = require('./routes/tarefaRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/tarefas', tarefaRouter);

module.exports = app;
