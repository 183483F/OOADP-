const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const Bills = db.define('bills', {
    title: {
        type: Sequelize.STRING
    },
    billCost: {
        type: Sequelize.STRING
    },
    dateDue: {
        type: Sequelize.DATE
    },
});

module.exports = Bills;