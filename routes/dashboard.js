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
        raw:true
    }).then((dashboard) => {
        res.render('alex/dashboard', {
            dashboard: dashboard
        });
    }).catch(err => console.log(err));
});

router.get('/dashboard2', (req, res) =>{
    Dashboard.findAll({
        raw: true
    }).then((dashboard) => {
        // pass object to listVideos.handlebar
        res.render('alex/dashboard2', {
            dashboard: dashboard
        });
    }).catch(err => console.log(err));
});

router.post('/dashboard', (req, res) => {
    let { CheckorSave, Amount, Tags, Notes, Date } = req.body;
    Dashboard.create({
        CheckorSave,
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