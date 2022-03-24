$(function() {
    "use strict";

// chart 1
  var ctx = document.getElementById("chart1").getContext('2d');
	
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

      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["잔여량", "사용량"],
          datasets: [{
            backgroundColor: [
              gradientStroke4,
              gradientStroke2
            ],
            hoverBackgroundColor: [
              gradientStroke4,
              gradientStroke2
            ],
			data: [80, 20],
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
                boxWidth:8
              }
            },
			tooltips: {
			  displayColors:false,
			}
        }
      });

// chart 2
  var ctx = document.getElementById("chart2").getContext('2d');

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

      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["잔여량", "사용량"],
          datasets: [{
            backgroundColor: [
              gradientStroke4,
              gradientStroke1
            ],
            hoverBackgroundColor: [
              gradientStroke4,
              gradientStroke1
            ],
            data: [55, 45],
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
                boxWidth:8
              }
            },
			tooltips: {
			  displayColors:false,
			}
        }
      });

   

// chart 3
  var ctx = document.getElementById("chart3").getContext('2d');

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

      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["잔여량", "사용량"],
          datasets: [{
            backgroundColor: [
              gradientStroke4,
              gradientStroke3
            ],
            hoverBackgroundColor: [
              gradientStroke4,
              gradientStroke3
            ],
            data: [50, 50],
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
                boxWidth:8
              }
            },
			tooltips: {
			  displayColors:false,
			}
        }
      });

   });
