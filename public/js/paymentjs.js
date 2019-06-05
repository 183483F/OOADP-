function changeText() {
    var element = document.getElementById('paylink');
    if (element.innerHTML === 'Pay') element.innerHTML = 'Paid';
    else{
        
    }
}

var dt = new Date();
document.getElementbyId("datetime").innerHTML = dt.toLocaleString();

alert("Hello world");