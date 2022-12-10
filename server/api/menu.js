const express = require('express');
const app = express.Router();
const {Menu, Item} = require('../db');

app.use(express.json());

app.get('/:id', async (req, res, next) => {
  try {
    console.log('api call')
    const menu = await Menu.findByPk(req.params.id,{
        include: Item
    });
    console.log('api end')
    res.send(menu);
  } catch (err) {
    next(err);
  }
});


module.exports = app;
