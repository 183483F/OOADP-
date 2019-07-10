const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Dashboard = require('../models/Dashboard')



router.get('/transactionH', (req, res) => {
    Dashboard.findAll({
        raw:true
    }).then((dashboard) => {
        res.render('transactionH', {
            dashboard: dashboard
        });
    }).catch(err => console.log(err));
});

module.exports = router;