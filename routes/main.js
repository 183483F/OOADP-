const express = require('express');
const router = express.Router();

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
module.exports = router;