const express = require('express');
const app = express.Router();
const { Menu, Item } = require('../db');

app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    const menus = await Menu.findAll();
    res.send(menus);
  } catch (err) {
    next(err);
  }
});

app.get('/:id', async (req, res, next) => {
  try {

    console.log(req.params.id);
    const menu = await Menu.findByPk(req.params.id,{
      include: {
        model: Item,
        // as: "Item" 
      }
    });
    console.log(menu);
    res.send(menu);
  } catch (err) {
    next(err);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const menu = await Menu.findAll();
    res.send(await menu.update(req.body));
  } catch (err) {
    next(err);
  }
});

app.post('/', async (req, res, next) => {
  try {
    res.send(await Menu.create(req.body));
  } catch (err) {
    next(err);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    await menu.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
