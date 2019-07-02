const moment = require('moment');
module.exports = {
    formatDate: function (date, targetFormat) {
        return moment(date).format(targetFormat);
    },

    radioCheck: function (value, radioValue) {
        // Write your codes here
        if (value === radioValue) {
            return "checked";
        } else {
            return "";
        }
    },

    compareDate: function (date, targetFormat) {
        var today = moment();
        var dueDate = moment(req.body.dateRelease, 'DD/MM/YYYY');
        var difference = a.diff(b, 'days');
        if (difference == 0) {

        } 
        
    },

    getDate: function (date) {
        return moment(date).format("dddd MMMM Do YYYY, h:mm:ss a");
    }
};