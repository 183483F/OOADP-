
$(document.readyState(function() {

    var ctx = document.getElementById('myChart')
    var myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
            /* datasets: [{
                label: '# of Ratings'
                data: [12, 19, 3, 5, 2, 3],

                backgroundColor: ['rgba(55, 214, 87, 1.0'], //green
                borderColor: ['rgba(255, 99, 132, 1'],  //red
                borderWidth: 1
            }]
            
        }, */
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        
    });
    $.ajax({
        url: 'AllFeedback',
        type: 'Get',
        success: function (counts){
            let labelList = [];
            let dataValue = [];
            for (var i = 0; i < counts.length; i++){
                labelList.push(counts[i].Rating)    //ratings
                dataValue.push(parseInt(counts[i].TagCount))
            };

            console.log(counts)
            var data = {
                labels: labelList,
                datasets: [{
                    labrl: dataValue,
                    backgroundColor: ['rgba(55, 214, 87, 1.0'], //green
                    borderColor: ['rgba(255, 99, 132, 1'],  //red
                    borderWidth: 1
                }]
            }
            myBarChart.data = data;
            myBarChart.update();
        }
        
    })
}));
