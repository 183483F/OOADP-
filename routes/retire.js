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


router.get('/retirement', ensureAuthenticated, (req, res) => {
    res.render('BudgetandRetirement/retirement');
});


router.get('/retirement2', ensureAuthenticated, (req, res) => {
    Retire.findAll({
        where: {
            userId: req.user.id
        },
        raw: true
    }).then((retires) => {
        // pass object to listVideos.handlebar
        res.render('BudgetandRetirement/retirement2', {
            retires: retires
        });
    }).catch(err => console.log(err));
});

router.post('/retirement', ensureAuthenticated, (req, res) => {
    let errors = []
    let MonthlyIncome = req.body.MonthlyIncome;
    let RetirementAge = req.body.RetirementAge;
    let RetirementGoal = req.body.RetirementGoal;
    let userId = req.user.id;
    if (MonthlyIncome % 1 != 0) {
        errors.push({ text: 'Please enter a whole number for your Monthly Income' });
    }
    if (RetirementAge % 1 != 0) {
        errors.push({ text: 'Please enter a whole number for your Monthly Income' });
    }
    if (RetirementGoal % 1 != 0) {
        errors.push({ text: 'Please enter a whole number for your Monthly Income' });
    }
    if (errors.length > 0) {
        res.render('BudgetandRetirement/retirement', {
            errors,
            MonthlyIncome,
            RetirementAge,
            RetirementGoal
        });
    } else {
        Retire.create({
            MonthlyIncome,
            RetirementAge,
            RetirementGoal,
            userId
            // userId
        }).then((retire) => {
            res.redirect('/retire/retirement2');
        })
            .catch(err => console.log(err))
    }
});

router.get('/editretire/:id', ensureAuthenticated, (req, res) => {
    Retire.findOne({
        where: {
            id: req.params.id
        }
    }).then((retires) => {
        if (retires.userId === req.user.id) {
            // call views/video/editVideo.handlebar to render the edit video page

            res.render('budgetandretirement/editretirement', {
                retires // passes video object to handlebar
            });
        } else {
            alertMessage(res, 'danger', 'Access denied', 'fas fa-exclamation-circle', true);
            res.redirect('/');
        }
    }).catch(err => console.log(err)); // To catch no video ID
});

router.put('/saveeditretire/:id', ensureAuthenticated, (req, res) => {
    let MonthlyIncome = req.body.MonthlyIncome;
    let RetirementAge = req.body.RetirementAge;
    let RetirementGoal = req.body.RetirementGoal;
    let userId = req.user.id;
    Retire.update({
        MonthlyIncome,
        RetirementAge,
        RetirementGoal,
        userId,
    }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.redirect('/retire/retirement2');
        }).catch(err => console.log(err));
});

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    var retiresId = req.params.id;
    Retire.findOne({
        where: {
            id: req.params.id
        }
    }).then((retires) => {
        console.log("retiresIDToDelete.userId : " + retires.userId);
        console.log("req.user.id : " + req.user.id);
        if (retires.userId === req.user.id) {
            Retire.destroy({
                where: {
                    id: retiresId
                }
            }).then((retires) => {
                // For icons to use, go to https://glyphsearch.com/
                alertMessage(res, 'success', 'Retirement successfully cleared.', true);
                res.redirect('/retire/retirement2');
            }).catch(err => console.log(err));
        } else {
            // Video does not belong to the current user
            alertMessage(res, 'danger', 'Unauthorized Access.', 'fas fa-exclamation-circle', true);
            req.logout();
            res.redirect('/');
        }
    })
});


module.exports = router;