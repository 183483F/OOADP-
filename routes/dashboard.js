const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger');
const moment = require('moment');
const Dashboard = require('../models/Dashboard');
const ensureAuthenticated = require('../helpers/auth');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    let userId = req.user.id
    Dashboard.findAll({
        where: {
            userId: userId
        },
        
        raw: true
    }).then((dashboard) => {
        var total = getSum(dashboard)
        var recent = recentTransaction(dashboard)
        res.render('alex/dashboard', {
            sum : total,
            dashboard: recent,
            /*dashboard: dashboard */
            /* dashboard: dashboard[dashboard.length - 1] */
        });
  
    })

});


router.post('/dashboardplus', ensureAuthenticated, (req, res) => {
    let { Name, Amount, Tags, Notes } = req.body;
    let Date = moment(req.body.Date, 'DD/MM/YYYY');
    let userId = req.user.id;
    let PlusMinus = "Deposit";
    Dashboard.create({
        Name,
        Amount,
        Tags,
        Notes,
        Date,
        userId,
        PlusMinus

    }).then((dashboard) => {
        res.redirect('/dashboard/dashboard');
    })
        .catch(err => console.log(err))

});
router.post('/dashboardminus', ensureAuthenticated, (req, res) => {
    let { Name, Amount, Tags, Notes } = req.body;
    let Date = moment(req.body.Date, 'DD/MM/YYYY');
    let userId = req.user.id;
    let PlusMinus = "Expenditure";
    Dashboard.create({
        Name,
        Amount,
        Tags,
        Notes,
        Date,
        userId,
        PlusMinus

    }).then((dashboard) => {
        res.redirect('/dashboard/dashboard');
    })
        .catch(err => console.log(err))

});


function getSum(dashboard){
    var sum = 0;
    for(var i = 0; i < dashboard.length; i++){
        if( dashboard[i].PlusMinus == "Deposit"){
            sum += dashboard[i].Amount;
        }
        else{
            sum -= dashboard[i].Amount;
        }
    }
    return sum
}


/*  */
/* delete for transaction history */
router.get('/dashboard/delete/:id', ensureAuthenticated, (req, res) => {
    let dashboardId = req.params.id;
    // Select * from videos where videos.id=videoID and videos.userId=userID
    Dashboard.findOne({
        where: {
            id: dashboardId,
        }
        /* attributes: ['id', 'Name'] */
    }).then((dashboard) => {
        // if record is found, user is owner of video
        if (dashboard.userId === req.user.id) {
            Dashboard.destroy({
                where: {
                    id: dashboardId
                }
            }).then(() => {
                alertMessage(res, 'info', 'Transaction deleted', 'far fa-trash-alt', true);
                res.redirect('/dashboard/dashboard'); // To retrieve all videos again
            }).catch(err => console.log(err));
        } else {
            alertMessage(res, 'danger', 'No such video', 'fas fa-exclamation-circle', true);
        }
    });
});


function recentTransaction(dashboard){
    var list = []
    
    for (let i = 0; i < dashboard.length ; i++){
            var dictionary = {}
            dictionary["id"] = dashboard[i].id;
            dictionary["Name"] = dashboard[i].Name;
            dictionary["Notes"] = dashboard[i].Notes;
            dictionary["Tags"] = dashboard[i].Tags;
            dictionary["Amount"] = dashboard[i].Amount;
            dictionary["Date"] = dashboard[i].Date;
            dictionary["Type"] = dashboard[i].PlusMinus;
            list.push(dictionary)
    }
    list.reverse();
    return list
}



module.exports = router;
