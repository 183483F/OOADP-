const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ensureAuthenticated = require('../helpers/auth');
const Dashboard = require('../models/Dashboard')
const feedback = require('../models/feedback'); 
/* >>>>>>> b6b08cd6e17409d1fd72f6296fdd7809040a387f */

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/payment', (req, res) =>{
    res.render('payment');
});

router.get('/transactionH', ensureAuthenticated,(req, res) => {
    Dashboard.findAll({
        raw:true
    }).then((dashboard) => {
        res.render('transactionH', {
            dashboard: dashboard
        });
    }).catch(err => console.log(err));
});

router.get('/alex', (req, res) => {
    res.render('alex/dashboard');
});

router.get('/showProfile',ensureAuthenticated, (req, res) =>{
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
 
router.get('/feedback', (req, res) =>{
    feedback.findAll({
        raw:true
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