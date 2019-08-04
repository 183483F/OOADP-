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

    compareDate: function (date, targetFormat) {
        var rdate = 0
        var today = moment();
        var dueDate = moment(date, targetFormat);
        
        var arrToday = today.split("/");
        
        var todayDay   = arrToday[0];
        var todayMonth = arrToday[1];       
        var todayYear   = arrToday[2];

        var arrDuedate = dueDate.split("/")

        var dueDateDay   = arrDuedate[0];
        var dueDateMonth = arrDuedate[1];       
        var dueDateYear   = arrDuedate[2];

        if (dueDateYear > todayYear)
        {
            return rdate = "4"
        }

        else if((dueDateYear == todayYear) && (dueDateMonth > todayMonth))
       {
            return rdate = "3" 
       }
       
        else if((dueDateYear == todayYear) && (dueDateMonth == todayMonth) && (dueDateDay > todayDay))
       {
            date = dueDateDay - todayDay
            if (date == 1)
            {
                return rdate = "1"
            } 
            else if (date == 0)
            {
                return rdate = "0"
            }
            else
            {
                return date = "2"
            }

       }
       


        /*var difference = today.diff(dueDate, 'days');
        if (difference == 0) {
            return "Today";
        } else if (difference == 1){
            return "Tomorrow";
        } else if (difference > 1 ){
            return this.formatDate(dueDate)
        } else {
            return this.formatDate(dueDate)
        }*/
        
    },
  
    getDate: function (date) {
        return moment(date).format("dddd MMMM Do YYYY");
    },
};