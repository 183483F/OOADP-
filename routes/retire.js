const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger');
const User = require('../models/User');
const Retire = require('../models/Retire')
var bcrypt = require('bcryptjs');
const passport = require('passport');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const ensureAuthenticated = require('../helpers/auth');
const fs = require('fs')
const upload = require('../helpers/imageUpload')
//const upload = require('../helpers/imageUpload');


router.get('/retirement', ensureAuthenticated, (req, res) =>{
    res.render('BudgetandRetirement/retirement');
});


router.get('/retirement2', ensureAuthenticated, (req, res) =>{
    Retire.findAll({
        raw: true
    }).then((retires) => {
        // pass object to listVideos.handlebar
        res.render('BudgetandRetirement/retirement2', {
            retires: retires[retires.length - 1]
        });
    }).catch(err => console.log(err));
});

router.post('/retirement', ensureAuthenticated, (req, res) => {
    let { MonthlyIncome, RetirementAge, RetirementGoal } = req.body;
    // let userId = req.user.id;
    // Multi-value components return array of strings or undefined
    Retire.create({
        MonthlyIncome,
        RetirementAge,
        RetirementGoal,
        // userId
    }).then((retire) => {
        res.redirect('/retire/retirement2');
    })
        .catch(err => console.log(err))

});

router.get('/editretire', ensureAuthenticated, (req, res) => {
    Retire.findOne({
        where: {
            id: req.params.id
        }
    }).then((user) => {
        if (req.user.id === user.id){
        // call views/video/editVideo.handlebar to render the edit video page
        
            res.render('budgetandretirement/editbudget', {
                user // passes video object to handlebar
            });
        } else{
            alertMessage(res, 'danger', 'Access denied', 'fas fa-exclamation-circle', true);
            res.redirect('/');
        }
    }).catch(err => console.log(err)); // To catch no video ID
});

router.put('/saveeditretire/:id', ensureAuthenticated, (req,res)=>{
    let MonthlyIncome = req.body.MonthlyIncome;
    let RetirementAge = req.body.RetirementAge;
    let RetirementGoal = req.body.RetirementGoal;
    let userId = req.user.id;
    var userID = req.params.id;
    User.update({
        MonthlyIncome,
        RetirementAge,
        RetirementGoal,
        userId,
    },{
        where:{
            id: userID
        }
    }).then(()=>{
        res.redirect('/user/retire2');
    }).catch(err => console.log(err));
});

module.exports = router;