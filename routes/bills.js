const Bills = require('../models/Bills');
const express = require('express');
const router = express.Router();
const moment = require('moment');
const ensureAuthenticated = require('../helpers/auth');
const alertMessage = require('../helpers/messenger')
const sequelize = require('sequelize');
const getDate = require('../helpers/hbs');




// List videos belonging to current logged in user
router.get('/payment',ensureAuthenticated,(req, res) => {
    Bills.findAll({
        where: {
            userId: req.user.id,
            dateDue:{ $lt : sequelize.col('date')}
          
        },
        order: [
            ['dateDue', 'desc']
        ],
        raw: true
    }).then((bills) => {
        // pass object to listVideos.handlebar
        res.render('bills/payment', {
            bills: bills
        });
    }).catch(err => console.log(err));
});

// Route to the page for User to add a new video
router.get('/addbills',ensureAuthenticated,(req, res) => {
    res.render('bills/addbills', { // pass object to listVideos.handlebar
        bills: 'List of bills'
    });
});

// Adds new video jot from /video/addVideo
router.post('/addbills',ensureAuthenticated,(req, res) => {
    let title = req.body.title;
    let billCost = req.body.billCost.slice(0, 50);
    let dateDue = moment(req.body.dateDue, 'DD/MM/YYYY');
    let date = moment().format();
    let userId = req.user.id;
    // Multi-value components return array of strings or undefined
    Bills.create({
        title,
        billCost,
        dateDue,
        date,
        userId
        
    }).then((bills) => {
        res.redirect('/bills/payment');
    })
        .catch(err => console.log(err))

});

// Shows edit video page
router.get('/edit/:id',ensureAuthenticated, (req, res) => {
    Bills.findOne({
        where: {
            id: req.params.id
        }
    }).then((bills) => {
        res.render('bills/editbills',{
            bills
        });
    
    }).catch(err => console.log(err)); // To catch no bills id*/
});

// Save edited video
router.put('/saveEditedBills/:id',ensureAuthenticated,(req, res) => {
    let title = req.body.title;
    let billCost = req.body.billCost.slice(0, 50);
    let dateDue = moment(req.body.dateDue, 'DD/MM/YYYY');
    var billID = req.params.id;
    let userId = req.user.id;
    // Retrieves edited values from req.body
    Bills.update({
        // Set variables here to save to the videos table
        title,
        billCost,
        dateDue,
        userId
    }, {
            where: {
                id: billID
            }
        }).then(() => {
            // After saving, redirect to router.get(/listVideos...) to retrieve all updated
            // videos
            res.redirect('/bills/payment');
        }).catch(err => console.log(err));
});

router.get('/delete/:id',ensureAuthenticated,(req, res) => {
    var billsId = req.params.id;
    Bills.findOne({
        where: {
            id: req.params.id
        }
    }).then((bills) => {
        console.log("billsIDToDelete.userId : " + bills.userId);
        console.log("req.user.id : " + req.user.id);
        if (bills.userId === req.user.id) {
            Bills.destroy({
                where: {
                    id: billsId
                }
            }).then((bills) => {
                // For icons to use, go to https://glyphsearch.com/
                alertMessage(res, 'success', 'Bills ID ' + billsid + ' successfully deleted.', true);
                res.redirect('/bills/payment');
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