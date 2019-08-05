const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const moment = require('moment');
moment().format();
const Sequelize = require('sequelize');
const ensureAuthenticated = require('../helpers/auth');
const alertMessage = require('../helpers/messenger');


/* get from table and display on allfeedback NO NEED USERid for this inorder to display all*/
router.get('/AllFeedback', (req, res) => {
    Feedback.findAll({ /* from models */
        /*         where: {
                    userId: req.user.id,
                },
         */
        raw: true
    }).then((feedbacks) => {
        var sumz = getCount(feedbacks) 
        res.render('feedback/AllFeedback', {
            feedbacks: feedbacks/* models feedback */,
            sumz : sumz 
        });
    }).catch(err => console.log(err));
});


/* no need userId as well to display all feed ADD */
router.get('/Addfeedback', (req, res) => {
    res.render('feedback/Addfeedback', { // pass object to listVideos.handlebar
        feedbacks: 'list of feedback'
    });
});


// get ALL Ratings
router.get('/AllFeedbackAjax', (req, res) => {

    Feedback.findAll({
        group: ['Rating'],
        order: [
            ['Rating', 'desc']
        ],
        attributes: ['Rating', [Sequelize.fn('COUNT', 'Rating'), 'TagCount']],
    }).then((counts) => {
        let p = counts[0].dataValue
        return res.json(counts)
    })
});

//post to table/db and create
router.post('/Addfeedback', (req, res) => {
    let Title = req.body.Title;
    let Textfeed = req.body.Textfeed.slice(0, 10000);
    let Suggestion = req.body.Suggestion.slice(0, 10000);
    let Date = moment(req.body.Date, 'DD/MM/YYYY');
    let Rating = req.body.Rating;
    let userId = req.user.id;
    let UserName = req.user.name;
    /*   let { Title, Textfeed, Suggestion, Date } = req.body; */
    Feedback.create({   /* from models */
        Title,
        Textfeed,
        Suggestion,
        Date,
        Rating,
        userId,
        UserName

    }).then((feedbacks) => {
        res.redirect('/feedback/AllFeedback');
    })
        .catch(err => console.log(err))

});


// Shows edit video page
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Feedback.findOne({
        where: {
            id: req.params.id
        }
    }).then((feedbacks) => {

        if (feedbacks.userId === req.user.id) {
            /*  checkOptions(feedbacks); */
            // call views/video/editVideo.handlebar to render the edit video page
            res.render('feedback/Editfeedback', {
                feedbacks // passes video object to handlebar
            });
        } else {
            // Video does not belong to the current user
            alertMessage(res, 'danger', 'Unauthorized Access. Cannot edit others feedback', 'fas fa-exclamation-circle', true);
            /* req.logout(); */
            res.redirect('/feedback/AllFeedback');
        }
    }).catch(err => console.log(err)); // To catch no video ID
});



// Save edited video
router.put('/saveEditedfeedback/:id', ensureAuthenticated, (req, res) => {
    let Title = req.body.Title;
    let Textfeed = req.body.Textfeed.slice(0, 10000);
    let Suggestion = req.body.Suggestion.slice(0, 10000);
    let Date = moment(req.body.Date, 'DD/MM/YYYY');
    let Rating = req.body.Rating;
    let userId = req.user.id;
    var FeedbackId = req.params.id;
    // Retrieves edited values from req.body
    Feedback.update({
        // Set variables here to save to the videos table
        Title,
        Textfeed,
        Suggestion,
        Date,
        Rating,
        userId
    }, {
            where: {
                id: FeedbackId
            }
        }).then(() => {
            // After saving, redirect to router.get(/listVideos...) to retrieve all updated
            // videos
            res.redirect('/feedback/AllFeedback');
        }).catch(err => console.log(err));
});



/* delete for own user feedbacks only  */
router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    let feedbackId = req.params.id;
    // Select * from videos where videos.id=videoID and videos.userId=userID
    Feedback.findOne({
        where: {
            id: feedbackId,
        },
        /* attributes: ['id', 'Title'] / / models feedback */
    }).then((feedbacks) => {
        // if record is found, user is owner of video
        if (feedbacks.userId === req.user.id) {
            Feedback.destroy({
                where: {
                    id: feedbackId
                }
            }).then(() => {
                alertMessage(res, 'info', 'Feedback deleted', 'far fa-trash-alt', true);
                res.redirect('/feedback/AllFeedback'); // To retrieve all videos again
            }).catch(err => console.log(err));
        } else {
            alertMessage(res, 'danger', 'Unauthorized Access, Cannot delete others feedback.', 'fas fa-exclamation-circle', true);
            res.redirect('/feedback/AllFeedback');
        }
    });
});


function getCount(feedbacks){
    var sumz = 0;
    for (var i = 0; i < feedbacks.length; i++){
        sumz += 1 
    }
    return sumz
}
 



module.exports = router;