const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger');
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const passport = require('passport');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const ensureAuthenticated = require('../helpers/auth');
const fs = require('fs')
const Sequelize = require('sequelize')
const upload = require('../helpers/imageUpload')
const Op = Sequelize.Op;
//const upload = require('../helpers/imageUpload');


router.get('/budget', ensureAuthenticated, (req, res) => {
    res.render('BudgetandRetirement/budget');
});

router.get('/budget2', ensureAuthenticated, (req, res) => {
    User.findAll({
        raw: true
    }).then((users) => {
        // pass object to listVideos.handlebar
        res.render('BudgetandRetirement/budget2', {
            users: users[users.length - 1]
        });
    }).catch(err => console.log(err));
});



router.post('/budgetretire', ensureAuthenticated, (req, res) => {
    //let Age = req.body.Age;
    //let MonthlyIncome = req.body.MonthlyIncome;
    //let MonthlySave = req.body.MonthlySave;
    //let Living = req.body.Living;
    //let Food = req.body.Food;
    //let Hobbies = req.body.Hobbies;
    let { Age, MonthlyIncome, MonthlySave, Living, Food, Hobbies } = req.body;
    // let userId = req.user.id;
    // Multi-value components return array of strings or undefined
    User.create({
        Age,
        MonthlyIncome,
        MonthlySave,
        Living,
        Food,
        Hobbies,
        // userId
    }).then((user) => {
        res.redirect('/user/budget2');
    })
        .catch(err => console.log(err))

});

router.get('/editbudget/:id', ensureAuthenticated, (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then((user) => {
        if (req.user.id === user.id) {
            // call views/video/editVideo.handlebar to render the edit video page

            res.render('budgetandretirement/editbudget', {
                user // passes video object to handlebar
            });
        } else {
            alertMessage(res, 'danger', 'Access denied', 'fas fa-exclamation-circle', true);
            res.redirect('/');
        }
    }).catch(err => console.log(err)); // To catch no video ID
});

router.put('/saveeditbudget/:id', ensureAuthenticated, (req, res) => {
    let errors = [];
    let Age = req.body.Age;
    let MonthlyIncome = req.body.MonthlyIncome;
    let MonthlySave = req.body.MonthlySave;
    let Living = req.body.Living;
    let Food = req.body.Food;
    let Hobbies = req.body.Hobbies;
    let userId = req.user.id;
    var userID = req.params.id;
    if (Age % 1 != 0) {
        errors.push({ text: 'Please enter a whole number for your age' });
    }
    if (Age > 120) {
        errors.push({ text: 'Please enter a number below 120' });
    }
    if (MonthlyIncome % 1 != 0) {
        errors.push({ text: 'Please enter a whole number for your Monthly Income' });
    }
    if (MonthlySave % 1 != 0) {
        errors.push({ text: 'Please enter a whole number for your Monthly Savings' });
    }
    if (Living % 1 != 0) {
        errors.push({ text: 'Please enter a whole number for your Living Expenses' });
    }
    if (Food % 1 != 0) {
        errors.push({ text: 'Please enter a whole number for your Food Expenses' });
    }
    if (Hobbies % 1 != 0) {
        errors.push({ text: 'Please enter a whole number for hobby spendings' });
    }
    if (errors.length > 0) {
        res.render('BudgetandRetirement/editbudget', {
            errors,
            Age,
            MonthlyIncome,
            MonthlySave,
            Living,
            Food,
            Hobbies
        });
    } else {
        User.update({
            Age,
            MonthlyIncome,
            MonthlySave,
            Living,
            Food,
            Hobbies,
            userId,
        }, {
                where: {
                    id: userID
                }
            }).then(() => {
                res.redirect('../budget2');
            }).catch(err => console.log(err));
    }
});

// Login Form POST => /user/login
router.post('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            if (user.verified === true) {
                passport.authenticate('local', {
                    successRedirect: '/', // Route to /home page
                    failureRedirect: '/showLogin', // Route to /login URL
                    failureFlash: true
                    /* Setting the failureFlash option to true instructs Passport to flash an error
                    message using the message given by the strategy's verify callback, if any.
                    When a failure occur passport passes the message object as error */
                })(req, res, next);
            } else {
                alertMessage(res, 'error', 'User is not verified', 'fas fa-exclamation-circle', true);
                res.redirect('/showLogin');
            }
        } else {
            alertMessage(res, 'error', 'User is non existing, please create an account.', 'fas fa-exclamation-circle', true);
            res.redirect('/showLogin');
        }
    })
    // Route to /video/listVideos URL

    /* Setting the failureFlash option to true instructs Passport to flash an error
    message using the message given by the strategy's verify callback, if any.
    When a failure occur passport passes the message object as error */
});


// User register URL using HTTP post => /user/register
router.post('/register', (req, res) => {

    let errors = [];
    // Retrieves fields from register page from request body
    let { name, email, password, password2 } = req.body;
    let { imgURL } = ""

    // Checks if both passwords entered are the same
    if (password !== password2) {
        errors.push({ text: 'Passwords do not match' });
    }

    // Checks that password length is more than 4
    if (password.length < 6) {
        errors.push({ text: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.render('user/register', {
            errors,
            name,
            email,
            password,
            password2,
            imgURL
        });
    } else {
        // If all is well, checks if user is already registered
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) {
                    // If user is found, that means email has already been
                    // registered
                    res.render('user/register', {
                        error: user.email + ' already registered',
                        name,
                        email,
                        password,
                        password2,
                        imgURL
                    });
                } else {
                    // Encrypt the password
                    let token;
                    jwt.sign(email, 's3cr3Tk3y', (err, jwtoken) => {
                        if (err) console.log('Error generating Token: ' + err);
                        token = jwtoken
                    });
                    var salt = bcrypt.genSaltSync(10);
                    var hashedPassword = bcrypt.hashSync(password, salt);
                    password = hashedPassword;

                    // Create new user record
                    User.create({ name, email, password, verified: 0, imgURL: "/img/no-image.jpg", })
                        .then(user => {
                            sendEmail(user.id, user.email, token)
                                .then(msg => {
                                    alertMessage(res, 'success', user.name + ' added. Please login to ' + user.email + ' to verify account.',
                                        'fas fa-sign-in-alt', true);
                                    res.redirect('/showLogin');
                                }).catch(err => {
                                    alertMessage(res, 'warning', 'Error sending to ' + user.email, 'fas fa-sign-in-alt', true);
                                    res.redirect('/');
                                });
                        })
                        .catch(err => console.log(err));
                }
            });
    }
});

router.get('/verify/:userId/:token', (req, res, next) => {
    // retrieve from user using id
    User.findOne({
        where: {
            id: req.params.userId
        }
    }).then(user => {
        if (user) { // If user is found
            let userEmail = user.email; // Store email in temporary variable
            if (user.verified === true) { // Checks if user has been verified
                alertMessage(res, 'info', 'User already verified', 'fas fa-exclamation - circle', true);
                res.redirect('/showLogin');
            } else {
                // Verify JWT token sent via URL
                jwt.verify(req.params.token, 's3cr3Tk3y', (err, authData) => {
                    if (err) {
                        alertMessage(res, 'danger', 'Unauthorised Access', 'fas fa-exclamation - circle', true);
                        res.redirect('/');
                    } else {
                        User.update({ verified: 1 }, {
                            where: { id: user.id }
                        }).then(user => {
                            alertMessage(res, 'success', userEmail + ' verified.Please login', 'fas fa - sign -in -alt', true);
                            res.redirect('/showLogin');
                        });
                    }
                });
            }
        } else {
            alertMessage(res, 'danger', 'Unauthorised Access', 'fas fa-exclamation-circle', true);
            res.redirect('/');
        }
    });
});


function sendEmail(userId, email, token) {
    sgMail.setApiKey('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');

    const message = {
        cc: "",
        to: email,
        from: 'Do Not Reply <admin@StrawberryMoneyTracker.sg>',
        subject: 'Verify Strawberry Money Tracker Account',
        text: 'Strawberry Money Tracker Email Verification',
        html: `Thank you registering with Strawberry Money.<br><br>
            Please <a href="http://localhost:5000/user/verify/${userId}/${token}">
                <strong>verify</strong></a> your account by clicking the link.`
    };
    // Returns the promise from SendGrid to the calling function
    return new Promise((resolve, reject) => {
        sgMail.send(message)
            .then(msg => resolve(msg))
            .catch(err => reject(err));
    });
}

router.post('/profile', (req, res) => {
    res.render('profile');
})
router.get('/', (req, res) => {
    const title = 'I\'m at the user router!';
    res.render('index', { title: title }) // renders views/index.handlebars
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then((user) => {
        if (req.user.id === user.id) {
            // call views/video/editVideo.handlebar to render the edit video page

            res.render('user/updateprofile', {
                user // passes video object to handlebar
            });
        } else {
            alertMessage(res, 'danger', 'Access denied', 'fas fa-exclamation-circle', true);
            res.redirect('/');
        }
    }).catch(err => console.log(err)); // To catch no video ID
});

router.put('/saveEditedProfile/:id', ensureAuthenticated, (req, res) => {
    let errors = []
    let name = req.body.name;
    let imgURL = req.body.imgURL;
    let email = req.body.email;
    let id = req.params.id;
    User.findOne({
        where: {
            id: id
        }
    }).then((item) => {
        User.findOne({
            where: {
                [Op.and]: [
                    {
                        id: {
                            [Op.ne]: id
                        }
                    },
                    {
                        email: email
                    }
                ]
            }
        }).then((duplicate) => {
            if (duplicate != null) {
                errors.push({ text: 'Email ' + email + ' has already been registered' })
                res.render('user/profile', { errors, users: item});
            }
            else {
                if (errors.length > 0) {
                    res.render('user/profile', { errors, users: item })
                }
                if(item.email == email)
                {
                    User.update({
                        "name": name,
                        "imgURL": imgURL
                    },{
                        where:{
                            id:id
                        }
                    }).then(() =>{
                        res.redirect('/showProfile');
                    }).catch(err => { console.log(err) });
                }
                else {
                    User.update({
                        "name": name,
                        "imgURL": imgURL,
                        "email": email,
                        "verified": 0
                    }, {
                            where: {
                                id: id
                            }
                        }).then((user) => {
                            let token;
                            jwt.sign(email, 's3cr3Tk3y', (err, jwtoken) => {
                                if (err) console.log('Error generating Token: ' + err);
                                token = jwtoken
                            });
                            sendEmail(user.id, user.email, token)
                            res.redirect('/logout')
                                .then(msg => {
                                    alertMessage(res, 'success', user.name + ' added. Please login to ' + user.email + ' to verify account.',
                                        'fas fa-sign-in-alt', true);
                                }).catch(err =>{console.log(err)});
                        }).catch(err => {
                            alertMessage(res, 'warning', 'Error sending to ' + email, 'fas fa-sign-in-alert', true);
                            res.redirect('/showProfile')
                            console.log(err);
                        });
                }
            }
        }).catch(err => { console.log(err) });
    }).catch(err => { console.log(err) });
});



router.post('/upload', ensureAuthenticated, (req, res) => {
    // Creates user id directory for upload if not exist
    if (!fs.existsSync('./public/uploads/' + req.user.id)) {
        fs.mkdirSync('./public/uploads/' + req.user.id);
    }

    upload(req, res, (err) => {
        if (err) {
            res.json({ file: '/img/no-image.jpg', err: err });
        } else {
            if (req.file === undefined) {
                res.json({ file: '/img/no-image.jpg', err: err });
            }
            else {
                res.json({ file: `/uploads/${req.user.id}/${req.file.filename}` });
            }
        }
    });
})

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    let userId = req.user.id;
    User.findOne({
        where: {
            id: userId
        }
    }).then((user) => {
        if (user) {
            User.destroy({
                where: {
                    id: userId
                }
            }).then((user) => {
                alertMessage(res, 'success', 'User deleted', 'fas fa-exclamation-circle', true)
                res.redirect("/logout")
            }).catch((err) => { console.log(err) })
        } else {
            alertMessage(res, 'danger', 'Unauthorized access to account', 'fas fa-exclamation-circle', true)
            res.redirect("/logout")
        }
    }).catch((err) => {
        console.log(err)
    })
});


module.exports = router;