const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a History(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/

const History = db.define('history', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    amount: {
        type: Sequelize.STRING
    },

});
module.exports = History;
