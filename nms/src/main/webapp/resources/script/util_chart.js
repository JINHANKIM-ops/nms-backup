// https://www.chartjs.org/docs/latest/developers/api.html
// https://www.youtube.com/watch?v=Imo8XGqsAO4

var DATASET_INDEX_0 = 0;
var DATA_INDEX_FREE = 0;
var DATA_INDEX_USED = 1;
var CHART_DATA_TITLE = ["잔여량", "사용량"];

function util_chart(index, uservalue, str) {

    var ctx = document.getElementById(`chart${index}-${str}`).getContext('2d');

    var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke1.addColorStop(0, '#ffd36c'); /*yellowColor*/
    gradientStroke1.addColorStop(1, '#f5c555');

    var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke2.addColorStop(0, '#1ccee8'); /*mintColor*/
    gradientStroke2.addColorStop(1, '#2aa9bc');

    var gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke3.addColorStop(0, '#bddb80'); /*greenColor*/
    gradientStroke3.addColorStop(1, '#9abb58');

    var gradientStroke4 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke4.addColorStop(0, '#EEE'); /*grayColor*/
    gradientStroke4.addColorStop(1, '#CCC');

    var chartColor = [];
    if (str == 'CPU') {
        chartColor = [gradientStroke4, gradientStroke2];
    } else if (str == 'MEM') {
        chartColor = [gradientStroke4, gradientStroke1];
    } else if (str == 'DISK') {
        chartColor = [gradientStroke4, gradientStroke3];
    }

    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: CHART_DATA_TITLE,
            datasets: [{
				/*backgroundColor: [
					gradientStroke4,
					gradientStroke2
				],
				hoverBackgroundColor: [
					gradientStroke4,
					gradientStroke2
				],*/
                backgroundColor: chartColor,
                hoverBackgroundColor: chartColor,
                data: [100 - parseFloat(uservalue), parseFloat(uservalue)],
                borderWidth: [3, 3]
            }]
        },
        options: {
            maintainAspectRatio: false,
            cutoutPercentage: 50,
            legend: {
                position: 'right',
                display: true,
                labels: {
                    boxWidth: 8
                }
            },
            tooltips: {
                displayColors: false,
            }
        }
    });

}