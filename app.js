const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const MySQLStore = require('express-mysql-session');
const session = require('express-session');
const { formatDate } = require('./helpers/hbs');
const app = express();


const mainRoute = require('./routes/main');
const billRoute = require('./routes/bills');





app.engine('handlebars', exphbs({
	helpers: {
		formatDate: formatDate,
	},
	defaultLayout: 'main' // Specify default template views/layout/main.handlebar 
}));
app.set('view engine', 'handlebars');

// Body parser middleware to parse HTTP body in order to read HTTP data
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());


// Method override middleware to use other HTTP methods such as PUT and DELETE
app.use(methodOverride('_method'));

// Enables session to be stored using browser's Cookie ID
app.use(cookieParser());

// Creates static folder for publicly accessible HTML, CSS and Javascript files
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	key: 'project_session',
	secret: 'itp211',
	store: new MySQLStore({
		host: db.host,
		port: 3306,
		user: db.username,
		password: db.password,
		database: db.database,
		clearExpired: true,
		// How frequently expired sessions will be cleared; milliseconds:
		checkExpirationInterval: 900000,
		// The maximum age of a valid session; milliseconds:
		expiration: 900000,
	}),

	resave: false,
	saveUninitialized: false,
})); 

app.use('/', mainRoute);
app.use('/bills', billRoute);
/*	
* Creates a unknown port 5000 for express server since we don't want our app to clash with well known
* ports such as 80 or 8080.
* */
app.use('/', mainRoute);
app.use('/user', userRoute);

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
