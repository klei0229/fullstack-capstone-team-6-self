const express = require('express');
const app = express.Router();
const { User } = require('../db');

app.use(express.json());

app.post('/', async (req, res, next) => {
  try {
    res.send(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

app.get('/', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (err) {
    next(err);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = app;
