const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/payment', (req, res) =>{
    res.render('payment');
});

router.get('/dashboard', (req, res) =>{
    res.render('dashboard');
});

module.exports = router;
router.get('/transactionH', (req, res) => {
    res.render('transactionH');
});

router.get('/retirement', (req, res) =>{
    res.render('BudgetandRetirement/retirement');
});

router.get('/budget', (req, res) =>{
    res.render('BudgetandRetirement/budget');
});

router.get('/budget2', (req, res) =>{
    User.findAll({
        raw: true
    }).then((users) => {
        // pass object to listVideos.handlebar
        res.render('BudgetandRetirement/budget2', {
            users: users
        });
    }).catch(err => console.log(err));
});



module.exports = router;