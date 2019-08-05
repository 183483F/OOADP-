$(document).ready(function () {
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ['5 star', '4 star', '3 star', '2 star', '1 star', '0'],
            datasets: [{
                label: '# Feedback Ratings',
                data: [5, 0, 0, 0, 0, 0],
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
                hoverBorderWidth: 4,

            }]
        },
        options: {
            title: {
                display: true,
                text: 'Star Rating Reviews',
                fontSize: 25
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]

            }

        }
    });
  

    $.ajax({
        url: '/Feedback/AllFeedbackAjax',   /* AllFeedback */
        type: 'GET',
        success: function (counts) {
            let labelList = [];
            let dataValue = [];
            for (var i = 0; i < counts.length; i++) {
                labelList.push(counts[i].Rating + " star")
                dataValue.push(parseInt(counts[i].TagCount))
            };

            console.log(counts)
            var data = {
                labels: labelList,
                datasets: [{
                    label: "# Number of feedback ratings ",
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
                        xAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0
                            },
                            minBarLength: 0,
                        }]
                    }

                }
            }
            myChart.data = data;
            myChart.update();
        }

    })
});