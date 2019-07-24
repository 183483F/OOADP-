const alertMessage = require('./messenger');//Bring in alert messenger

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    //if not authenticated, show alert message and retirect to
    alertMessage(res, 'danger', 'Access Denied', 'fas fa-exclamation-circle', true);
    res.redirect('/');
};
module.exports = ensureAuthenticated;