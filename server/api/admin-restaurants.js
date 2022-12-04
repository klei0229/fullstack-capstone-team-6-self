const express = require('express');
const app = express.Router();
const { Restaurant } = require('../db');

app.use(express.json());

app.get('/:id', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.send(restaurants);
  } catch (err) {
    next(err);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.send(await restaurant.update(req.body));
  } catch (err) {
    next(err);
  }
});

app.post('/', async (req, res, next) => {
  try {
    res.send(await Restaurant.create(req.body));
  } catch (err) {
    next(err);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
