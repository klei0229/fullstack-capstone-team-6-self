
const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;


const Menu = conn.define('menu', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  description: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
});



module.exports = Menu;

