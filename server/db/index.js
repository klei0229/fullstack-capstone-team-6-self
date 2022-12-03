const conn = require('./conn');
const User = require('./User');
const Restaurant = require('./Restaurant');
const Access = require('./Access');
const Designation = require('./Designation');
const Item = require('./Item');
const Menu = require('./Menu');
const Category = require('./Category');


//associations
User.hasMany(Restaurant);
Restaurant.hasMany(Menu);
Menu.hasMany(Item);
Item.hasOne(Category);
Item.belongsToMany(Designation, { through: 'itemdesignations'});
Designation.belongsToMany(Item, { through: 'itemdesignations'});
User.hasOne(Access);
Access.hasOne(Restaurant);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123'}),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);

  const [res1,res2] = await Promise.all([
    Restaurant.create({ name: 'Yummy Town', address: '123', contact:"123", email:"123@gmail.com", userId:moe.id}),
    Restaurant.create({ name: 'Yummy Town2', address: '234', contact:"1234", email:"1234@gmail.com", userId:lucy.id}),
  ]);

  const [menu1,menu2] = await Promise.all([
    Menu.create({ name: 'Breakfast Menu', description: '12432423', restaurantId:res1.id}),
    Menu.create({ name: 'Lunch Menu', description: '12343242342353', restaurantId:res2.id}),
  ]);

  // res1.userId(moe.id);

  // await Restaurant.create({ name: 'Yummy Town1', address: '123', contact:"123", email:"123@gmail.com"});


  // const [restaurantName] = await Promise.all([
  //   Restaurant.create({ name: 'Yummy Town', address: '123', contact:"123", email:"123@gmail.com"}),

  // ]);

  return {
    users: {
      moe,
      lucy,
      larry,
    },
    restaurants:{
      res1,
      res2
    },
    menus:{
      menu1,
      menu2
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
  Restaurant,
  Menu
};
