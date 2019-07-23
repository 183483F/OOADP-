const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const db = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const FlashMessenger = require('flash-messenger');// Library to use MySQL to store session objects
const MySQLStore = require('express-mysql-session');
const { formatDate, getDate } = require('./helpers/hbs');
const passport = require('passport');
const app = express();

const mainRoute = require('./routes/main');
const userRoute = require('./routes/user')
const billRoute = require('./routes/bills');
const dashboardRoute = require('./routes/dashboard')
const transactionH = require('./routes/transactionH')
const feedback = require('./routes/Feedback')

app.engine('handlebars', exphbs({
	helpers: {
		formatDate: formatDate,
		getDate: getDate
	},
	defaultLayout: 'main' // Specify default template views/layout/main.handlebar 
}));
app.set('view engine', 'handlebars');

// Body parser middleware to parse HTTP body in order to read HTTP data
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// Creates static folder for publicly accessible HTML, CSS and Javascript files
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware to use other HTTP methods such as PUT and DELETE
app.use(methodOverride('_method'));

// Enables session to be stored using browser's Cookie ID
app.use(cookieParser());

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

app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

app.use(FlashMessenger.middleware); // add this statement after flash()
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

app.use(function (req, res, next) {
	next();
});

app.use('/', mainRoute);
app.use('/bills', billRoute);
app.use('/user', userRoute);
app.use('/dashboard', dashboardRoute)
app.use('/transactionH', transactionH)
app.use('/Feedback', feedback)

const port = 5000;

// Starts the server and listen to port 5000
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
// Bring in database connection
const vidjotDB = require('./config/DBConnection');
// Connects to MySQL database
vidjotDB.setUpDB(true); // To set up database with new tables set (true)

// Passport Config
const authenticate = require('./config/passport');
authenticate.localStrategy(passport);
app.use(passport.initialize());
app.use(passport.session());
