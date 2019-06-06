const Bills = require('../models/Bills');
const express = require('express');
const router = express.Router();

// List videos belonging to current logged in user
router.get('/payment',(req, res) => {
    Bills.findAll({
        /*where: {
            user: req.user
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
        dateRelease
        /*userId*/
    }).then((bills) => {
        res.redirect('/bills/payment');
    })
        .catch(err => console.log(err))

});


module.exports = router;