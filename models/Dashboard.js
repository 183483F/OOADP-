const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const Dashboard = db.define('dashboard', {
    Amount: {
        type: Sequelize.INTEGER
    },
    Tags: {
        type: Sequelize.STRING
    },
    Notes: {
        type: Sequelize.STRING
    },
    Date: {
        type: Sequelize.DATE
    },
    Name: {
        type: Sequelize.STRING
    },
    
});
module.exports = Dashboard;
verified: {
    type: Sequelize.BOOLEAN
   }