const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const Retire = db.define('retire', {
    MonthlyIncome: {
        type: Sequelize.STRING
    },
    RetirementAge: {
        type: Sequelize.STRING
    },
    RetirementGoal: {
        type: Sequelize.STRING
    },
});
module.exports = Retire;