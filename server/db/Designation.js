
const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;


const Designation = conn.define('designation', {
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
  }
});



module.exports = Designation;

