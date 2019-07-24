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
        type: Sequelize.STRING
    },
    Suggestion: {
        type: Sequelize.STRING
    },
    Date: {
        type: Sequelize.DATE
    },
    Rating:{
		type: Sequelize.STRING
	}
 
});
module.exports = Feedback;
/* verified: {
    type: Sequelize.BOOLEAN
   } */