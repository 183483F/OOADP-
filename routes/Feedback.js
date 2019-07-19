const express = require('express');
const router = express.Router();
const feedback = require('../models/feedback');
const moment = require('moment');
moment().format();

/* get from table and display on allfeedback */
router.get('/Allfeedback', (req, res) => {
    feedback.findAll({ /* from models */
        raw:true
    }).then((feedback) => {
        res.render('feedback/AllFeedback', {
            feedback: feedback  /* models feedback */
        });
    }).catch(err => console.log(err));
});



// get inputs on addfeedback
router.get('/Addfeedback',(req, res) => {
    res.render('feedback/Addfeedback', { // pass object to listVideos.handlebar
        feedback: 'list of feedback'
    });
});

//post to table/db and create
router.post('/Addfeedback', (req, res) => {
    let Title = req.body.Title;
    let Textfeed = req.body.Textfeed.slice(0, 2000);
    let Suggestion = req.body.Suggestion.slice(0, 2000);
    let Date = moment(req.body.Date, 'DD/MM/YYYY');
  /*   let { Title, Textfeed, Suggestion, Date } = req.body; */
    feedback.create({   /* from models */
        Title,
        Textfeed,
        Suggestion,
        Date,
    }).then((feedback) => {
        res.redirect('/feedback/AllFeedback');
    })
        .catch(err => console.log(err))

});

   
module.exports = router;
