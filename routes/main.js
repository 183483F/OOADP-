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

router.get('/transactionH', (req, res) => {
    res.render('transactionH');
});

module.exports = router;