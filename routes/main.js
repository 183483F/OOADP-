const express = require('express');
const router = express.Router();

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
    res.render('retirement');
});

router.get('/budget', (req, res) =>{
    res.render('budget');
});

module.exports = router;
