const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const Retire = db.define('retire', {
    MonthlyIncome: {
        type: Sequelize.INTEGER
    },
    RetirementAge: {
        type: Sequelize.INTEGER
    },
    RetirementGoal: {
        type: Sequelize.INTEGER
    },
});
module.exports = Retire;