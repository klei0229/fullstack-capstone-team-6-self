const express = require('express');
const app = express.Router();
const { Menu, Item } = require('../db');

app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    const menus = await Menu.findAll({
      include: [Item],
    });
    // menus.forEach((menu) => {
    //   menu.items.forEach((item) => {
    //     if (item.image) {
    //       const imagePath = item.image.replace('C:\\fakepath\\', '');
    //       console.log('image path in GET (menus): ', imagePath);
    //       item.image = imagePath;
    //     }
    //   });
    // })
    res.send(menus);
  } catch (err) {
    next(err);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    const menu = await Menu.findByPk(req.params.id, {
      include: [Item],
    });
    // menu.items.forEach((item) => {
    //   if (item.image) {
    //     const imagePath = item.image.replace('C:\\fakepath\\', '');
    //     console.log('image path in GET (menu): ', imagePath);
    //     item.image = imagePath;
    //   }
    // });
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
    // menu.items.forEach((item) => {
    //   if (item.image) {
    //     const imagePath = item.image.replace('C:\\fakepath\\', '');
    //     console.log('image path in PUT (menu): ', imagePath);
    //     item.image = imagePath;
    //   }
    // });
    await menu.update(req.body);
    res.send(menu);
  } catch (err) {
    next(err);
  }
});

app.post('/', async (req, res, next) => {
  try {
    res.send(
      await Menu.create(req.body, {
        include: [Item],
      })
    );
    menu.items.forEach((item) => {
      if (item.image) {
        const imagePath = item.image.replace('C:\\fakepath\\', '');
        console.log('image path in POST (menu): ', imagePath);
        item.image = imagePath;
      }
    });
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
