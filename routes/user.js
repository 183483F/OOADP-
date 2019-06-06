const express = require('express');
const router = express.Router();
//const alertMessage = require('../helpers/messenger');
//const moment = require('moment');
const User = require('../models/User');
//const ensureAuthenticated = require('../helpers/auth');
//const fs = require('fs');
//const upload = require('../helpers/imageUpload');

router.post('/budgetretire', (req, res) => {
    //let Age = req.body.Age;
    //let MonthlyIncome = req.body.MonthlyIncome;
    //let MonthlySave = req.body.MonthlySave;
    //let Living = req.body.Living;
    //let Food = req.body.Food;
    //let Hobbies = req.body.Hobbies;
    let { Age, MonthlyIncome, MonthlySave, Living, Food, Hobbies } = req.body;
    //let userId = req.user.id;
    // Multi-value components return array of strings or undefined
    User.create({
        Age,
        MonthlyIncome,
        MonthlySave,
        Living,
        Food,
        Hobbies
       // userId
    }).then((user) => {
        res.redirect('../budget2');
    })
        .catch(err => console.log(err))

});

module.exports = router;    