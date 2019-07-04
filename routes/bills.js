const Bills = require('../models/Bills');
const express = require('express');
const router = express.Router();
const moment = require('moment');
moment().format();
const alertMessage = require('../helpers/messenger')
// List videos belonging to current logged in user
router.get('/payment',(req, res) => {
    Bills.findAll({
        /*where: {
            user: req.user.id
        },*/
        order: [
            ['title', 'ASC']
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
router.get('/addbills',(req, res) => {
    res.render('bills/addbills', { // pass object to listVideos.handlebar
        bills: 'List of bills'
    });
});

// Adds new video jot from /video/addVideo
router.post('/addbills',(req, res) => {
    let title = req.body.title;
    let billCost = req.body.billCost.slice(0, 50);
    let dateRelease = moment(req.body.dateRelease, 'DD/MM/YYYY');
    /*let userId = req.user.id;*/
    // Multi-value components return array of strings or undefined
    Bills.create({
        title,
        billCost,
        dateRelease,
        
    }).then((bills) => {
        res.redirect('/bills/payment');
    })
        .catch(err => console.log(err))

});

// Shows edit video page
router.get('/edit/:id', (req, res) => {
    Bills.findOne({
        where: {
            id: req.params.id
        }
    }).then((bills) => {

        if (req.user.id === bills.userId) {
            checkOptions(bills);
            // call views/video/editVideo.handlebar to render the edit video page
            res.render('bills/editbills', {
                bills // passes video object to handlebar
            });
        } else {
            // Video does not belong to the current user
            alertMessage(res, 'danger', 'Unauthorized Access.', 'fas fa-exclamation-circle', true);
            req.logout();
            res.redirect('/');
        }
    }).catch(err => console.log(err)); // To catch no bills id
});

// Save edited video
router.put('/saveEditedBills/:id',(req, res) => {
    let title = req.body.title;
    let billCost = req.body.billCost.slice(0, 50);
    let dateRelease = moment(req.body.dateRelease, 'DD/MM/YYYY');
    var billID = req.params.id;
    // Retrieves edited values from req.body
    Bills.update({
        // Set variables here to save to the videos table
        title,
        billCost,
        dateRelease,
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

router.get('/delete/:id',(req, res) => {
    var billsId = req.params.id;
    Bills.findOne({
        where: {
        }
    }).then((bills) => {
        console.log("billsIDToDelete.userId : " + bills.userId);
        console.log("req.user.id : " + req.user.id);
        if (video.userId === req.user.id) {
            Bills.destroy({
                where: {
                }
            }).then((bills) => {
                // For icons to use, go to https://glyphsearch.com/
                alertMessage(res, 'success', 'Bills ID ' + billsId + ' successfully deleted.', 'fa fa-hand-peace-o', true);
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