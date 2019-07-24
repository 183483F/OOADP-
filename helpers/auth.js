const alertMessage = require('./messenger');//Bring in alert messenger

const ensureAuthenticated = (req, res, next) => {
    var auth = req.isAuthenticated()
    if (auth){
        next();
    } else {
        //if not authenticated, show alert message and retirect to
        alertMessage(res, 'danger', 'Access Denied', 'fas fa-exclamation-circle', true);
        res.redirect('/');
    }
};
module.exports = ensureAuthenticated;