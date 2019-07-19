const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const moment = require('moment');
moment().format();

/* get from table and display on allfeedback */
router.get('/AllFeedback', (req, res) => {
    Feedback.findAll({ /* from models */
        order: [
            ['title', 'ASC']
        ],
        raw:true
    }).then((feedbacks) => {
        res.render('feedback/AllFeedback', {
            feedbacks: feedbacks  /* models feedback */
        });
    }).catch(err => console.log(err));
});



// get inputs on addfeedback
router.get('/Addfeedback',(req, res) => {
    res.render('feedback/Addfeedback', { // pass object to listVideos.handlebar
        feedbacks: 'list of feedback'
    });
});

//post to table/db and create
router.post('/Addfeedback', (req, res) => {
    let Title = req.body.Title;
    let Textfeed = req.body.Textfeed.slice(0, 2000);
    let Suggestion = req.body.Suggestion.slice(0, 2000);
    let Date = moment(req.body.Date, 'DD/MM/YYYY');
  /*   let { Title, Textfeed, Suggestion, Date } = req.body; */
    Feedback.create({   /* from models */
        Title,
        Textfeed,
        Suggestion,
        Date,
    }).then((feedbacks) => {
        res.redirect('/feedback/AllFeedback');
    })
        .catch(err => console.log(err))

});

   
module.exports = router;
