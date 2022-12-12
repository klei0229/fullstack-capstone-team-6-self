const express = require('express');
const app = express.Router();
const { Menu, Item } = require('../db');

app.use(express.json());

app.get('/:id', async (req, res, next) => {
  try {
    const menu = await Menu.findByPk(req.params.id, {
      include: [Item],
    });
    res.send(menu);
  } catch (err) {
    next(err);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const menu = await Menu.findByPk(req.params.id, {
      include: [Item],
    });
    await menu.update(req.body);
    res.send(menu);
  } catch (err) {
    next(err);
  }
});


module.exports = app;
