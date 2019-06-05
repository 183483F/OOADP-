function changeText() {
    var element = document.getElementById('paylink');
    if (element.innerHTML === 'Pay') element.innerHTML = 'Paid';
    else{
        element.innerHTML = 'Pay';
    }
}