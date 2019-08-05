const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const User = db.define('user', {
    Age: {
        type: Sequelize.INTEGER
    },
    MonthlyIncome: {
        type: Sequelize.INTEGER
    },
    MonthlySave: {
        type: Sequelize.INTEGER
    },
    Living: {
        type: Sequelize.INTEGER
    },
    Food: {
        type: Sequelize.INTEGER
    },
    Hobbies: {
        type: Sequelize.INTEGER
    },
    name:{
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    verified: {
        type: Sequelize.BOOLEAN
    },
    imgURL:{
        type: Sequelize.STRING,
    },
});
module.exports = User;