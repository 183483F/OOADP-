function changeText() {
    var element = document.getElementById('paylink');
    if (element.innerHTML === 'Pay') element.innerHTML = 'Paid';
    else{
        element.innerHTML = 'Pay';
    }
}

var dt = new Date();
document.getElementbyId("datetime").innerHTML = dt.toLocaleString();

alert("Hello world");