const express = require('express');
const app = express.Router();
const { Item, Menu } = require('../db');

app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (err) {
    next(err);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    res.send(item);
  } catch (err) {
    next(err);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id, {
      include: [Menu],
    });
    res.send(await item.update(req.body));
  } catch (err) {
    next(err);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    res.send(item);
  } catch (err) {
    next(err);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
