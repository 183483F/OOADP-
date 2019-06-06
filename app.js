const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();


const mainRoute = require('./routes/main');

app.use('/', mainRoute);



app.engine('handlebars', exphbs({
	defaultLayout: 'main' // Specify default template views/layout/main.handlebar 
}));
app.set('view engine', 'handlebars');

// Creates static folder for publicly accessible HTML, CSS and Javascript files
app.use(express.static(path.join(__dirname, 'public')));


/*	
* Creates a unknown port 5000 for express server since we don't want our app to clash with well known
* ports such as 80 or 8080.
* */
const port = 5000;

// Starts the server and listen to port 5000
app. listen(port, () => {
	console.log(`Server started on port ${port}`);
});
// Bring in database connection
const vidjotDB = require('./config/DBConnection');
// Connects to MySQL database
vidjotDB.setUpDB(false); // To set up database with new tables set (true)
// Passport Config
const authenticate = require('./config/passport');
//authenticate.localStrategy(passport);
