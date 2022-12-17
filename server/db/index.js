const conn = require('./conn');
const User = require('./User');
const Restaurant = require('./Restaurant');
const Access = require('./Access');
const Designation = require('./Designation');
const Item = require('./Item');
const Menu = require('./Menu');
const Category = require('./Category');
const ItemDesignation = require('./ItemDesignation');

//associations
User.hasMany(Restaurant);
Restaurant.belongsTo(User);
Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);
Menu.hasMany(Item);
Item.belongsTo(Menu);
// Category.hasMany(Item);
// Item.belongsTo(Category);
User.hasOne(Access);
Access.belongsTo(User);
Restaurant.hasOne(Access);
Access.belongsTo(Restaurant);

Item.belongsToMany(Designation, { through: ItemDesignation });
Designation.belongsToMany(Item, { through: ItemDesignation });

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123', isAdmin: true }),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);

  const [res1, res2] = await Promise.all([
    Restaurant.create({
      name: 'Yummy Town',
      address: '123',
      contact: '123',
      email: '123@gmail.com',
      userId: moe.id,
    }),
    Restaurant.create({
      name: 'Yummy Town2',
      address: '234',
      contact: '1234',
      email: '1234@gmail.com',
      userId: lucy.id,
    }),
  ]);

  const defaultPreferences = {
    padding: '0',
    margin: '0',
    primaryColor: '#000000',
    restaurantNameFontSize: 65,
    categoryNameFontSize: 30,
    itemNameFontSize: 20,
    descriptionNameFontSize: 20,
    fontFamily: 'verdana',
  };
  const [menu1, menu2, menu3] = await Promise.all([
    Menu.create({
      name: 'Breakfast Menu',
      description: '12432423',
      restaurantId: res1.id,
      preferences: JSON.stringify(defaultPreferences),
      template: 'template2',
    }),
    Menu.create({
      name: 'Lunch Menu',
      description: '12343242342353',
      restaurantId: res2.id,
      preferences: JSON.stringify(defaultPreferences),
      template: 'template2',
    }),
    Menu.create({
      name: 'French Menu',
      description: 'Our Signature French Cuisine',
      restaurantId: res1.id,
      preferences: JSON.stringify(defaultPreferences),
      template: 'template3',
    }),
  ]);

  // const [breakfast, starters, mains, desserts] = await Promise.all([
  //   Category.create({ name: 'Breakfast' }),
  //   Category.create({ name: 'Starters' }),
  //   Category.create({ name: 'Mains' }),
  //   Category.create({ name: 'Desserts' }),
  // ]);

  const [spicy, glutenFree, vegetarian] = await Promise.all([
    Designation.create({ name: 'Spicy' }),
    Designation.create({ name: 'Gluten Free' }),
    Designation.create({ name: 'Vegetarian' }),
  ]);

  const [food1, food2, food3] = await Promise.all([
    Item.create({
      name: 'pancakes',
      price: 4.99,
      menuId: menu1.id,
      category: 'breakfast',
    }),
    Item.create({
      name: 'eggs',
      price: 1.99,
      menuId: menu1.id,
      category: 'breakfast',
    }),
    Item.create({
      name: 'hashbrowns',
      price: 3.99,
      menuId: menu1.id,
      category: 'breakfast',
    }),
  ]);

  //create items for french menu (menu 3) - for testing
  const [food4, food5, food6, food7, food8, food9] = await Promise.all([
    Item.create({
      name: 'Odette',
      description: 'Smoked organic egg, potato, chorizo, buckwheat',
      price: 4.99,
      menuId: menu3.id,
      category: 'starters',
    }),
    Item.create({
      name: 'Cheveux d’anges',
      description: 'Angel hair pasta, Kristal caviar, black truffle, kombu',
      price: 5.99,
      menuId: menu3.id,
      category: 'starters',
    }),
    Item.create({
      name: 'Plounéour-Ménez',
      description:
        'Pie, ‘Plounéour-Ménez’ pigeon, yellow chicken, duck foie gras, Périgeux sauce',
      price: 19.99,
      menuId: menu3.id,
      category: 'mains',
    }),
    Item.create({
      name: 'La côte de veau de lait du Limousin rôtie',
      description:
        'Roasted milk-fed Limousin veal chop, “pommes boulangères”, Dumè Cesari valetta, split veal jus',
      price: 25.99,
      menuId: menu3.id,
      category: 'mains',
    }),
    Item.create({
      name: 'Le chocolat Grand Cru',
      description: '‘Grand cru’ chocolate',
      price: 7.99,
      menuId: menu3.id,
      category: 'desserts',
    }),
    Item.create({
      name: 'émulsion orange huile d’olive, glace au gingembre',
      description:
        'Wakayama citrus textures, fromage blanc cream, orange and olive oil emulsion, ginger ice cream',
      price: 10.99,
      menuId: menu3.id,
      category: 'desserts',
    }),
  ]);

  ItemDesignation.create({ itemId: food2.id, designationId: spicy.id });

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
    restaurants: {
      res1,
      res2,
    },
    menus: {
      menu1,
      menu2,
      menu3,
    },
    items: {
      food1,
      food2,
      food3,
      food4,
      food5,
      food6,
      food7,
      food8,
      food9,
    },
    // categories: {
    //   breakfast,
    //   starters,
    //   mains,
    //   desserts,
    // },
    designations: {
      spicy,
      glutenFree,
      vegetarian,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Restaurant,
  Menu,
  Category,
  Designation,
  Item,
  Access,
};
