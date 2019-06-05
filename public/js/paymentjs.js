function changeText() {
    var element = document.getElementById('paylink');
    if (element.innerHTML === 'Pay') element.innerHTML = 'Paid';
    else{
        element.innerHTML = 'Paid';
    }
}

var dt = new Date();
document.getElementbyId("datetime").innerHTML = dt;

alert("Hello world");