const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dayAssigned: {
    type: Sequelize.DATEONLY,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['Incomplete', 'Complete', 'RolledOver'],
    defaultValue: 'Incomplete'
  }
});

module.exports = Task;
