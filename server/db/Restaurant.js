const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;


const Restaurant = conn.define('restaurant', {
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
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  description: {
    type: STRING,
    validate: {
      notEmpty: false
    },
    unique: true
  },
  contact: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  logo: {
    type: TEXT,
    get: function(){
      const prefix = 'data:image/png;base64,';
      const data = this.getDataValue('restaurant');
      if(!data){
        return data;
      }
      if(data.startsWith(prefix)){
        return data;
      }
      return `${prefix}${data}`;
    }
  }
});



module.exports = Restaurant;

