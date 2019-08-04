const Bills = require('../models/Bills');
const express = require('express');
const router = express.Router();
const moment = require('moment');
const ensureAuthenticated = require('../helpers/auth');
const alertMessage = require('../helpers/messenger')
const Sequelize = require('sequelize');
const getDate = require('../helpers/hbs');
const { Op } = require('sequelize')

// List videos belonging to current logged in user
router.get('/payment',ensureAuthenticated,(req, res) => {
    let today = moment().tz("Asia/Singapore").toDate();
    Bills.findAll({
        where: {
            userId: req.user.id,
            paid:0,
            dateDue: { [Op.gte] : today }// sequelize.col('date')}
          
        },
        order: [
            ['dateDue', 'asc']
        ],
        // raw: true
    }).then((bills) => {
        // pass object to listVideos.handlebar
        var total = getSum(bills)
        res.render('bills/payment', {
            sum : total,
            bills: bills
        });
    }).catch(err => console.log(err));
});
/* not confirm */
router.get("/payment/search/:query", ensureAuthenticated, (req, res) => {     /*  search/ajax/:query */
    let query = req.params.query;
    Bills.findAll({
        where : {
            userId: req.user.id,
            title: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col("title")), 'LIKE', '%' + query + '%')
          /*   Date: Sequelize.where(Sequelize.fn(Sequelize.col("Date"))) */
        },
        order: [
            ['title', 'asc']
        ],
        raw: true
    }).then((bills) => {
        res.json({
            bills : bills 

        })
    }).catch(err => console.log(err));
})

router.get('/overdue',ensureAuthenticated,(req, res) => {
    let today = moment().tz("Asia/Singapore").toDate();
    Bills.findAll({
        where: {
            userId: req.user.id,
            dateDue: { [Op.lte] : today }// sequelize.col('date')}
          
        },
        order: [
            ['dateDue', 'asc']
        ],
        // raw: true
    }).then((bills) => {
        // pass object to listVideos.handlebar
        res.render('bills/overdue', {
            bills: bills
        });
    }).catch(err => console.log(err));
});

router.get('/paid',ensureAuthenticated,(req, res) => {
    let today = moment().tz("Asia/Singapore").toDate();
    Bills.findAll({
        where: {
            userId: req.user.id,
            paid: 1,
        },
        order: [
            ['dateDue', 'asc']
        ],
        SUM: [
            ['billCost']
        ],
        // raw: true
    }).then((bills) => {
        // pass object to listVideos.handlebar
        res.render('bills/overdue', {
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
    let dateDue = moment(req.body.dateDue, 'DD/MM/YYYY').tz('Asia/Singapore');
    let link = req.body.link;
    let userId = req.user.id;
    // Multi-value components return array of strings or undefined
    Bills.create({
        title,
        billCost,
        dateDue,
        paid: 0,
        link,
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
    let link = req.body.link;
    var billID = req.params.id;
    let userId = req.user.id;
    // Retrieves edited values from req.body
    Bills.update({
        // Set variables here to save to the videos table
        title,
        billCost,
        dateDue,
        link,
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
            id: req.params.id,
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
                alertMessage(res, 'success', 'Bills ID ' + billsId + ' successfully deleted.', true);
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

router.get('/update/:id',ensureAuthenticated,(req, res) => {
    var billsId = req.params.id;
    Bills.findOne({
        where: {
            id: req.params.id
        }
    }).then((bills) => {
        console.log("billsIDToUpdate.userId : " + bills.userId);
        console.log("req.user.id : " + req.user.id);
        if (bills.userId === req.user.id) {
            Bills.update({
                paid: 1 },{
                where: {
                    id: billsId
                }
            }).then((bills) => {
                // For icons to use, go to https://glyphsearch.com/
                alertMessage(res, 'success', 'Bills ID ' + billsId + ' paid', true);
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

router.get('/unUpdate/:id',ensureAuthenticated,(req, res) => {
    var billsId = req.params.id;
    Bills.findOne({
        where: {
            id: req.params.id
        }
    }).then((bills) => {
        console.log("billsIDToUpdate.userId : " + bills.userId);
        console.log("req.user.id : " + req.user.id);
        if (bills.userId === req.user.id) {
            Bills.update({
                paid: 0 },{
                where: {
                    id: billsId
                }
            }).then((bills) => {
                // For icons to use, go to https://glyphsearch.com/
                alertMessage(res, 'success', 'Bills ID ' + billsId + ' paid', true);
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

function getSum(bills){
    var sum = 0;
    for(var i = 0; i < bills.length; i++){
            sum += bills[i].billCost;
    }
    return sum
}




module.exports = router;