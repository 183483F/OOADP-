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

    ifEquals: function (a, b, options) {
        if (a == b) { return options.fn(this); }
        return options.inverse(this);
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

    getDate: function (date) {
        return moment(date).format("dddd MMMM Do YYYY");
    },
};