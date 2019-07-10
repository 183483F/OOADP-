const moment = require('moment');
const Bills = require('../models/Bills');
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
    /*calculateCost: function (value) {
        var totalCost = req.params.id
        Bills.findOne({
            where: {
                id = billCostId
            }
        } 
        for length(Bills) {
            totalCost = req.body.billCost
            totalCost = totalCost + totalCost
        }
    },*/

    compareDate: function (date, targetFormat) {
        var today = moment();
        var dueDate = moment(req.body.dateRelease, 'DD/MM/YYYY');
        var difference = a.diff(b, 'days');
        if (difference == 0) {
            return this.formatDate(dueDate)
        } else if (difference == 1){
            return this.formatDate(dueDate)
        } else if (difference > 1 ){
            return this.formatDate(dueDate)
        } else {
            return this.formatDate(dueDate)
        }
        
    },

    getDate: function (date) {
        return moment(date).format("dddd MMMM Do YYYY, h:mm:ss a");
    }
};