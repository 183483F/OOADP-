const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ensureAuthenticated = require('../helpers/auth');
<<<<<<< HEAD
const Dashboard = require('../models/Dashboard');
const feedback = require('../models/feedback');
const alertMessage = require('../helpers/messenger');
const Sequelize = require('sequelize');
/* >>>>>>> b6b08cd6e17409d1fd72f6296fdd7809040a387f */
=======
const Dashboard = require('../models/Dashboard')
const Feedback = require('../models/Feedback')
>>>>>>> 23041df3ebc1f5e129e735c6b9af44402868ded8

router.get('/', (req, res) => {
    Feedback.findAll({ /* from models */
        raw: true
    }).then((feedbacks) => {
        res.render('index', {
            feedbacks: feedbacks,  /* models feedback */
        });
    }).catch(err => console.log(err));
});

router.get('/payment', (req, res) => {
    res.render('payment');
});
<<<<<<< HEAD
/* search button transaction */
router.get('/transactionH/dashboardID', ensureAuthenticated,(req, res) => {
    let dashboardId = req.params.id;
    Dashboard.findAll({
        
        where : {
            id: dashboardId,
            Name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col("Name")),{ $like: ` %${req.query.Name}% `} )
        }, 
        attributes: ['id', 'Name']
        /* raw:true */
    }).then((dashboard) => {
        res.render('transactionH', {
            dashboard: dashboard
        });
    }).catch(err => console.log(err));
});



router.get('/transactionH', ensureAuthenticated,(req, res) => {
    Dashboard.findAll({
        raw:true 
=======
router.get('/overdue', (req, res) => {
    res.render('overdue');
});

router.get('/transactionH', ensureAuthenticated,(req, res) => {
    Dashboard.findAll({
        raw: true
>>>>>>> 23041df3ebc1f5e129e735c6b9af44402868ded8
    }).then((dashboard) => {
        res.render('transactionH', {
            dashboard: dashboard
        });
    }).catch(err => console.log(err));
});



/* not confirm */
router.get("/transactionH/search/:query", ensureAuthenticated, (req, res) => {     /*  search/ajax/:query */
    let query = req.params.query;
    Dashboard.findAll({ // select * from video where userid = ... and title like '%dark%';
        where : {
            /* userId: req.user.id, */
            Name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col("Name")), 'LIKE', '%' + query + '%')
          /*   Date: Sequelize.where(Sequelize.fn(Sequelize.col("Date"))) */
        },
        order: [
            ['Name', 'ASC']
        ],
        raw: true
    }).then((dashboard) => {
        res.json({
            dashboard : dashboard /* from transaction handlebar */

        })
    }).catch(err => console.log(err));
})


router.get('/search', ensureAuthenticated, (req, res) => {
    res.render('transactionH', {});
})
/* not confirm */





router.get('/alex', (req, res) => {
    res.render('alex/dashboard');
});

router.get('/showProfile', ensureAuthenticated, (req, res) => {
    //findone*
    User.findAll({
        where: {
            id: req.user.id
        },
        order: [
            ['name', 'ASC']
        ],
        raw: true
    }).then((users) => {
        // pass object to listVideos.handlebar
        res.render('user/profile', {
            users: users
        });
    }).catch(err => console.log(err));
});

router.get('/showLogin', (req, res) => {
    res.render('user/login') // renders views/user/login.handlebars
});

router.get('/showRegister', (req, res) => {
    res.render('user/register') // renders views/register.handlebars
});

router.get('/feedback', (req, res) => {
    feedback.findAll({
        raw: true
    }).then((feedback) => {
        res.render('Feedback', {
            feedback: feedback
        });
    }).catch(err => console.log(err));

});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;