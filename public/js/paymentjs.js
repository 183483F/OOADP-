const moment = require('moment');
module.exports = {
    getDate: function (date) {
        return moment(date).format("dddd MMMM Do YYYY, h:mm:ss a");
    }
}

function changeText() {
    var element = document.getElementById('paylink');
    if (element.innerHTML === 'Pay') element.innerHTML = 'Paid';
    else{
        element.innerHTML = 'Paid';
    }
}


alert("Hello world");