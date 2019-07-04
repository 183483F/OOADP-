const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ensureAuthenticated = require('../helpers/auth');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/payment', (req, res) =>{
    res.render('payment');
});

router.get('/transactionH', (req, res) => {
    res.render('transactionH');
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
module.exports = router;