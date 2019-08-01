
$(document).ready(function () {
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
<<<<<<< HEAD
            labels: ['5 star', '4 star', '3 star', '2 star', '1 star', '0'],
            datasets: [{
                label: '# Feedback Ratings',
                data: [5, 0, 0, 0, 0, 0],
=======
            labels: ['5', '4', '3', '2', '1', '0'],
            datasets: [{
                label: '# Feedback Ratings',
                data: [12, 19, 3, 5, 2, 3],
>>>>>>> 23041df3ebc1f5e129e735c6b9af44402868ded8
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
                borderWidth: 2,
<<<<<<< HEAD
                hoverBorderWidth: 4,

            }]
        },
        options: {
            title: {
                display: true,
                text: 'Reviews',
                fontSize: 25
=======
                hoverBorderWidth:4,
                
            }]
        },
        options: {
            title:{
                display:true,
                text:'Reviews',
                fontSize:25
>>>>>>> 23041df3ebc1f5e129e735c6b9af44402868ded8
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
<<<<<<< HEAD

        }
    });
  

    $.ajax({
        url: '/feedback/AllFeedbackAjax',   /* AllFeedback */
        type: 'GET',
        success: function (counts) {
            let labelList = [];
            let dataValue = [];
            for (var i = 0; i < counts.length; i++) {
                labelList.push(counts[i].Rating)
                dataValue.push(parseInt(counts[i].TagCount, "star"))
=======
            
        }
    });
            /* datasets: [{
                label: '# of Ratings'
                data: [12, 19, 3, 5, 2, 3],

                backgroundColor: ['rgba(55, 214, 87, 1.0'], //green
                borderColor: ['rgba(255, 99, 132, 1'],  //red
                borderWidth: 1
            }]
            
        },
        options: {
            ticks: { beginAtZero: true}
        }
        */

    $.ajax({
        url: '/Feedback',   /* AllFeedback */
        type: 'GET',
        success: function (counts){
            let labelList = [];
            let dataValue = [];
            for (var i = 0; i < counts.length; i++){
                labelList.push(counts[i].Rating)
                dataValue.push(parseInt(counts[i].TagCount))
>>>>>>> 23041df3ebc1f5e129e735c6b9af44402868ded8
            };

            console.log(counts)
            var data = {
                labels: labelList,
                datasets: [{
<<<<<<< HEAD
                    label: "# Number of Feedbacks",
=======
                    label: "Store Items",
>>>>>>> 23041df3ebc1f5e129e735c6b9af44402868ded8
                    data: dataValue,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(94, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(94, 159, 64, 0.2)'
                    ],
<<<<<<< HEAD
                    borderWidth: 2,
                    hoverBorderWidth: 4,
                }],
                options: {
                    title: {
                        display: true,
                        text: 'Reviews',
                        fontSize: 25
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }

                }
=======
                    borderWidth: 1
                }]
>>>>>>> 23041df3ebc1f5e129e735c6b9af44402868ded8
            }
            myChart.data = data;
            myChart.update();
        }
<<<<<<< HEAD

    })
});


=======
        
    })
});

   
>>>>>>> 23041df3ebc1f5e129e735c6b9af44402868ded8
