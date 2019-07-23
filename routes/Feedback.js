const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const moment = require('moment');
moment().format();
const Sequelize = require('sequelize');



/* get from table and display on allfeedback */
router.get('/AllFeedback', (req, res) => {
    Feedback.findAll({ /* from models */
        raw:true
    }).then((feedbacks) => {
        res.render('feedback/AllFeedback', {
            feedbacks: feedbacks  /* models feedback */
        });
    }).catch(err => console.log(err));
});

router.get('/Addfeedback',(req, res) => {
    res.render('feedback/Addfeedback', { // pass object to listVideos.handlebar
        feedbacks: 'list of feedback'
    });
});


// get Ratings
router.get('/AllFeedbackAjax',(req, res) => {
    
    Feedback.findAll({
        group: ['Rating'],
        order:[
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
    let Textfeed = req.body.Textfeed.slice(0, 2000);
    let Suggestion = req.body.Suggestion.slice(0, 2000);
    let Date = moment(req.body.Date, 'DD/MM/YYYY');
    let Rating = req.body.Rating;
  /*   let { Title, Textfeed, Suggestion, Date } = req.body; */
    Feedback.create({   /* from models */
        Title,
        Textfeed,
        Suggestion,
        Date,
        Rating,
    }).then((feedbacks) => {
        res.redirect('/feedback/AllFeedback');
    })
        .catch(err => console.log(err))

});

/* 
// Shows edit video page
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Feedback.findOne({
        where: {
            id: req.params.id
        }
    }).then((feedbacks) => {

        if (req.user.id === feedbacks.userId) {
            checkOptions(feedbacks);
            // call views/video/editVideo.handlebar to render the edit video page
            res.render('video/editVideo', {
                feedbacks // passes video object to handlebar
            });
        } else {
            // Video does not belong to the current user
            alertMessage(res, 'danger', 'Unauthorized Access.', 'fas fa-exclamation-circle', true);
            req.logout();
            res.redirect('/');
        }
    }).catch(err => console.log(err)); // To catch no video ID
});



// Save edited video
router.put('/saveEditedVideo/:id', ensureAuthenticated, (req, res) => {
    let title = req.body.title;
    let story = req.body.story.slice(0, 1999);
    let dateRelease = moment(req.body.dateRelease, 'DD/MM/YYYY');
    let language = req.body.language.toString();
    let subtitles = req.body.subtitles === undefined ? '' : req.body.subtitles.toString();
    let classification = req.body.classification;
    let starring = req.body.starring; // Practical 09 Exercise 02
    let posterURL = req.body.posterURL; // Practical 09 Exercise 02
    let userId = req.user.id;
    var videoID = req.params.id;
    // Retrieves edited values from req.body
    Video.update({
        // Set variables here to save to the videos table
        title,
        story,
        dateRelease,
        language,
        subtitles,
        classification,
        userId,
        starring,
        posterURL
    }, {
            where: {
                id: videoID
            }
        }).then(() => {
            // After saving, redirect to router.get(/listVideos...) to retrieve all updated
            // videos
            res.redirect('/video/listVideos');
        }).catch(err => console.log(err));
});

 */

module.exports = router;
