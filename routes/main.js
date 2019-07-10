const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Dashboard = require('../models/Dashboard')

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/payment', (req, res) =>{
    res.render('payment');
});

router.get('/transactionH', (req, res) => {
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
module.exports = router;