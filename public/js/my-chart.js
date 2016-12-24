// var ctx = document.getElementById("myChart");
// var labels = [];
// var backgroundColors = [];
// var borderColors = [];
// var chartData = [];

// for (var i = 1; i <= 44; i++){
//   labels.push(i);
// }

// for (var i = 1; i <= 44; i++){
//   backgroundColors.push("rgba(255, 99, 132, 0.2)");
//   backgroundColors.push("rgba(54, 162, 235, 0.2)");
//   backgroundColors.push("rgba(255, 206, 86, 0.2)");
//   backgroundColors.push("rgba(75, 192, 192, 0.2)");
// }

// for (var i = 1; i <= 44; i++){
//   borderColors.push("rgba(255, 99, 132, 0.2)");
//   borderColors.push("rgba(54, 162, 235, 0.2)");
//   borderColors.push("rgba(255, 206, 86, 0.2)");
//   borderColors.push("rgba(75, 192, 192, 0.2)");
// }

// for (var i = 1; i <= 44; i++){
//   chartData.push(1);
// }

// chartData[23] = 50;

// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: labels,
//         datasets: [{
//             label: 'Total Points',
//             data: chartData,
//             backgroundColor: backgroundColors,
//             borderColor: borderColors,
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });