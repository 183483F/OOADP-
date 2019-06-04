const allExpress = require("express");

var exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main1'}));
app.set('view engine','handlebars');

app.use(express.static(__dirname + '/views/layout'));

app.get('/',function(req,res) {
    res.render('home');
});

app.listen(5000);