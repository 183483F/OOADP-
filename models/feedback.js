const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/

const Feedback = db.define('feedbacks', {
    Title: {
        type: Sequelize.STRING
    },
    Textfeed: {
        type: Sequelize.STRING(2000)
    },
    Suggestion: {
        type: Sequelize.STRING(2000)
    },
    feedbackDate: {
        type: Sequelize.Date
    },
 
});
module.exports = Feedback;
/* verified: {
    type: Sequelize.BOOLEAN
   } */