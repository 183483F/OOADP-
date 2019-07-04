const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const User = db.define('user', {
    Age: {
        type: Sequelize.STRING
    },
    MonthlyIncome: {
        type: Sequelize.STRING
    },
    MonthlySave: {
        type: Sequelize.STRING
    },
    Living: {
        type: Sequelize.STRING
    },
    Food: {
        type: Sequelize.STRING
    },
    Hobbies: {
        type: Sequelize.STRING
    },
    verified: {
        type: Sequelize.BOOLEAN
    },
});
module.exports = User;