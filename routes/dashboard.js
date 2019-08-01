const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger');
const moment = require('moment');
const Dashboard = require('../models/Dashboard');
const ensureAuthenticated = require('../helpers/auth');

router.get('/dashboard', (req, res) =>{
    Dashboard.findAll({
        SUM: [
            ['Amount']
        ],
        raw:true
    }).then((dashboard) => {
        res.render('alex/dashboard', {
            dashboard: dashboard[dashboard.length - 1]
        });
    }).catch(err => console.log(err));
});



router.post('/dashboard', (req, res) => {
    let {Name, Amount, Tags, Notes} = req.body;
    let Date = moment(req.body.Date, 'DD/MM/YYYY');
    Dashboard.create({
        Name,
        Amount,
        Tags,
        Notes,
        Date,
    }).then((dashboard) => {
        res.redirect('/dashboard/dashboard');
    })
        .catch(err => console.log(err))

});


/* delete for transaction history */
router.get('/delete/:id', ensureAuthenticated, (req, res) => {
	let dashboardId = req.params.id;
	// Select * from videos where videos.id=videoID and videos.userId=userID
	Dashboard.findOne({
		where: {
			id: dashboardId,
        },
        attributes: ['id', 'Name']
	}).then((dashboard) => {
		// if record is found, user is owner of video
		if (dashboard != null) {
			dashboard.destroy({
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



module.exports = router;    