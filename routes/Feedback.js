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
<<<<<<< HEAD

        raw:true
    }).then((feedbacks) => {

=======
        raw:true
    }).then((feedbacks) => { 
>>>>>>> 40a3e91b4a41ae5653e9bfff7ead73c44d7ccdb4
        res.render('feedback/AllFeedback', {
            feedbacks: feedbacks  /* models feedback */
        });
    }).catch(err => console.log(err));
});

<<<<<<< HEAD
=======
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
>>>>>>> 40a3e91b4a41ae5653e9bfff7ead73c44d7ccdb4
router.get('/Addfeedback',(req, res) => {
    res.render('feedback/Addfeedback', { // pass object to listVideos.handlebar
        feedbacks: 'list of feedback'
    });
});


// get Ratings
router.get('/AllFeedback',(req, res) => {
    feedbacks.findAll({
        group: ['Rating'],
        attributes: ['Rating', [Sequelize.fn('COUNT', 'Rating'), 'TagCount']],
    }).then((counts) => {
        let p = counts[0].dataValue
        return res.json(counts)
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