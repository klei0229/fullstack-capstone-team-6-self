
const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;


const Access = conn.define('access', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  }
});



module.exports = Access;

