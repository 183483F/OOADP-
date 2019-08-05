const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ensureAuthenticated = require('../helpers/auth');
const Dashboard = require('../models/Dashboard');
const Feedback = require('../models/Feedback');
const alertMessage = require('../helpers/messenger');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment');
const retire = require('../models/Retire')
/* >>>>>>> b6b08cd6e17409d1fd72f6296fdd7809040a387f */

router.get('/', (req, res) => {
    Feedback.findAll({ /* from models */
        raw: true
    }).then((feedbacks) => {
        res.render('index', {
            feedbacks: feedbacks,  /* models feedback */
        });
    }).catch(err => console.log(err));
});

router.get('/payment', (req, res) => {
    res.render('payment');
});

router.get('/transactionH', ensureAuthenticated,(req, res) => {
    let userId = req.user.id
    Dashboard.findAll({
        where: {
            userId: userId
        },
        raw:true 
    }).then((dashboard) => {
        res.render('transactionH', {
            dashboard: dashboard
        });
    }).catch(err => console.log(err));
});


/* not confirm */
router.get("/transactionH/search/:query/:StartDate/:EndDate", ensureAuthenticated, (req, res) => {     /*  search/ajax/:query */
    let query = req.params.query;
    let StartDate = req.params.StartDate;
    let EndDate = req.params.EndDate;
    Dashboard.findAll({ // select * from video where userid = ... and title like '%dark%';
        where : {
            userId: req.user.id,
            Name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col("Name")), 'LIKE', '%' + query + '%'),
/*          Date: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col("Date")), { [Op.gte] : EndDate }, '%' + StartDate + '%'), */  
        Date: { 
               [Op.gte]: moment(StartDate).tz("Asia/Singapore").toDate()
            },
        Date: { 
                [Op.lt]: moment(EndDate).tz("Asia/Singapore").toDate()
            }           
        },
        order: [
            ['Name', 'ASC']
           /*  ['Date', 'ASC'] */
        ],
        raw: true
    }).then((dashboard) => { // this is a list of dictionary, for each record inside, change the format the date
        // [ { id:11, amount: ...,  Tags:...,  Date: <date_obj> }, ..., { id:11, amount: ...,  Tags:...,  Date: <date_obj> }   ]
        // 
     /*    dashboard.forEach(dashboard[Date] => {
            
        }); */

        res.json({
            dashboard : dashboard /* from transaction handlebar */

        })
    }).catch(err => console.log(err));
})

router.get('/search', ensureAuthenticated, (req, res) => {
    res.render('transactionH', {});
})
/* not confirm */



/* delete for transaction history */
router.get('/delete/:id', ensureAuthenticated, (req, res) => {
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
                res.redirect('/transactionH'); // To retrieve all videos again
            }).catch(err => console.log(err));
        } else {
            alertMessage(res, 'danger', 'No such video', 'fas fa-exclamation-circle', true);
        }
    });
});




router.get('/alex', (req, res) => {
    res.render('alex/dashboard');
});

router.get('/showProfile', ensureAuthenticated, (req, res) => {
    //findone*
    User.findAll({
        where: {
            id: req.user.id
        },
        order: [
            ['name', 'ASC']
        ],
        raw: true
    }).then((users) => {
        // pass object to listVideos.handlebar
        res.render('user/profile', {
            users: users
        });
    }).catch(err => console.log(err));
});

router.get('/showLogin', (req, res) => {
    res.render('user/login') // renders views/user/login.handlebars
});

router.get('/showRegister', (req, res) => {
    res.render('user/register') // renders views/register.handlebars
});

router.get('/feedback', (req, res) => {
    feedback.findAll({
        raw: true
    }).then((feedback) => {
        res.render('Feedback', {
            feedback: feedback
        });
    }).catch(err => console.log(err));

});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;