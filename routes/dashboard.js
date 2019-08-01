const express = require('express');
const router = express.Router();
//const alertMessage = require('../helpers/messenger');
const moment = require('moment');
const Dashboard = require('../models/Dashboard');
//const ensureAuthenticated = require('../helpers/auth');
//const fs = require('fs');
//const upload = require('../helpers/imageUpload');

router.get('/dashboard', (req, res) =>{
    Dashboard.findAll({
        SUM: [
            ['Amount']
        ],
        raw:true
    }).then((dashboard) => {
        res.render('alex/dashboard', {
            dashboard: dashboard[dashboard.length - 1]
        });
    }).catch(err => console.log(err));
});



router.post('/dashboard', (req, res) => {
    let {Name, Amount, Tags, Notes,  } = req.body;
    let Date = moment(req.body.Date, 'DD/MM/YYYY');
    Dashboard.create({
        Name,
        Amount,
        Tags,
        Notes,
        Date,
    }).then((dashboard) => {
        res.redirect('/dashboard/dashboard');
    })
        .catch(err => console.log(err))

});

module.exports = router;    