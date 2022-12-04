const conn = require('./conn');
const Item = require('./Item');
const Designation = require('./Designation');
const { UUID, UUIDV4 } = conn.Sequelize;

const ItemDesignation = conn.define('itemDesignation', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  itemId: {
    type: UUID,
    references: {
      model: Item,
      key: 'id',
    },
  },
  designationId: {
    type: UUID,
    references: {
      model: Designation,
      key: 'id',
    },
  },
});

module.exports = ItemDesignation;
