const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, DECIMAL } = conn.Sequelize;

const Item = conn.define("item", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: TEXT,
    get: function () {
      const prefix = "data:image/png;base64,";
      const data = this.getDataValue("image");
      if (!data) {
        return data;
      }
      if (data.startsWith(prefix)) {
        return data;
      }
      return `${prefix}${data}`;
    },
  },
  props: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },

  },
});

module.exports = Item;
