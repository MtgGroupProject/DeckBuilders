var xValues = ["Forest", "Mountain", "Plains", "Island", "Swamp"];
var yValues = [55, 49, 44, 24, 25];
var barColors = ["green", "red","tan","blue","black"];

var xyValues = [
    {x:0, y:5},
    {x:10, y:10},
    {x:20, y:15},
    {x:30, y:20},
    {x:40, y:25},
    {x:50, y:30},
    {x:60, y:35},
    {x:70, y:40},
    {x:80, y:45},
    {x:90, y:50},
    {x:100, y:55}
  ];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
    }
  }
});



    new Chart("myChart2", {
        type: "scatter",
        data: {
          datasets: [{
            pointRadius: 4,
            pointBackgroundColor: "rgba(0,0,255,1)",
            data: xyValues
          }]
        },
        options: {
            legend: {display: false},
            scales: {
              xAxes: [{ticks: {min: 0, max:100}}],
              yAxes: [{ticks: {min: 0, max:100}}],
            }
          }
        });
