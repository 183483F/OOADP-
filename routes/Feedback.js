const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const moment = require('moment');
moment().format();
const Sequelize = require('sequelize');



/* get from table and display on allfeedback */
router.get('/AllFeedback', (req, res) => {
    Feedback.findAll({ /* from models */

     /*    where : {
            userId: req.user.id, 
            Title: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col("Title")),{ $like: ` %${req.query.AllFeedback}% `} )
        }, 

     /*    LOWER(Title) LIKE %INPUT%;*/
        raw:true
    }).then((feedbacks) => { 
        res.render('feedback/AllFeedback', {
            feedbacks: feedbacks  /* models feedback */
        });
    }).catch(err => console.log(err));
});

router.get('/AllFeedback',(req, res) => {
    Feedback.findAll({ /* from models */
        group:["Rating"],
        attributes: ['Rating', [Sequelize.fn('COUNT', ' Rating'), 'TagCount']],
         
       raw:true
    }).then((counts) => { //suppose to be (counts)
       let p = counts[0].dataValue

       return res.json(counts)
    })
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

   
module.exports = router;
