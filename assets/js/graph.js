// myStr.split(" — ")[0]


var xValues = ["G", "R", "W", "U", "B"]
var yValues = [0, 0, 0, 0, 0];
var barColors = ["green", "red", "tan", "blue", "black"];


var selectedDeck = data[0];

for (i = 0; i < selectedDeck.cards.length; i++) {
  for (j = 0; j < selectedDeck.cards[i].colors.length; j++) {
    if (selectedDeck.cards[i].colors[j] === "G") {
      yValues[0] = yValues[0] + 1;
    }
    if (selectedDeck.cards[i].colors[j] === "R") {
      yValues[1] = yValues[1] + 1;
    }
    if (selectedDeck.cards[i].colors[j] === "W") {
      yValues[2] = yValues[2] + 1;
    }
    if (selectedDeck.cards[i].colors[j] === "U") {
      yValues[3] = yValues[3] + 1;
    }
    if (selectedDeck.cards[i].colors[j] === "B") {
      yValues[4] = yValues[4] + 1;
    }
  }
}
//Color bar Graph
new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

var xyValues = [
  // {x:0, y:5},
  // {x:10, y:10},
  // {x:20, y:15},
  // {x:30, y:20},
  // {x:40, y:25},
  // {x:50, y:30},
  // {x:60, y:35},
  // {x:70, y:40},
  // {x:80, y:45},
  // {x:90, y:50},
  // {x:100, y:55}
];
//CmC bar graph
var valuesX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var valuesY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < selectedDeck.cards.length; j++) {
    console.log(i)
    console.log(selectedDeck.cards[j].cmc == i);
    if(selectedDeck.cards[j].cmc == i) {
      valuesY[i] = valuesY[i] + 1
    }
  }
}

// var xValues = ["G", "R", "W", "U", "B"]
// var yValues = [0, 0, 0, 0, 0];
// var barColors = ["green", "red", "tan", "blue", "black"];


// var selectedDeck = data[0];

// for (i = 0; i < selectedDeck.cards.length; i++) {
//   for (j = 0; j < selectedDeck.cards[i].colors.length; j++) {
//     if (selectedDeck.cards[i].colors[j] === "G") {
//       yValues[0] = yValues[0] + 1;
//     }
//     if (selectedDeck.cards[i].colors[j] === "R") {
//       yValues[1] = yValues[1] + 1;
//     }
//     if (selectedDeck.cards[i].colors[j] === "W") {
//       yValues[2] = yValues[2] + 1;
//     }
//     if (selectedDeck.cards[i].colors[j] === "U") {
//       yValues[3] = yValues[3] + 1;
//     }
//     if (selectedDeck.cards[i].colors[j] === "B") {
//       yValues[4] = yValues[4] + 1;
//     }
//   }
// }
// //Color bar Graph
// new Chart("myChart", {
//   type: "bar",
//   data: {
//     labels: xValues,
//     datasets: [
//       {
//         backgroundColor: barColors,
//         data: yValues,
//       },
//     ],
//   },
//   options: {
//     legend: { display: false },
//     title: {
//       display: true,
//     },
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   },
// });

// var xyValues = [
//   // {x:0, y:5},
//   // {x:10, y:10},
//   // {x:20, y:15},
//   // {x:30, y:20},
//   // {x:40, y:25},
//   // {x:50, y:30},
//   // {x:60, y:35},
//   // {x:70, y:40},
//   // {x:80, y:45},
//   // {x:90, y:50},
//   // {x:100, y:55}
// ];
// //CmC bar graph
// var valuesX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// var valuesY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// for (let i = 0; i < 20; i++) {
//   for (let j = 0; j < selectedDeck.cards.length; j++) {
//     console.log(i)
//     console.log(selectedDeck.cards[j].cmc == i);
//     if(selectedDeck.cards[j].cmc == i) {
//       valuesY[i] = valuesY[i] + 1
//     }
//   }
// }

// console.log(valuesX);
// console.log(valuesY);

// new Chart("myChart2", {
//   type: "bar",
//   data: {
//     labels: valuesX,
//     datasets: [
//       {
//         backgroundColor: "black",
//         data: valuesY,
//       },
//     ],
//   },
//   options: {
//     legend: { display: false },
//     title: {
//       display: true,
//     },
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   },
// });

})

var xValues = ["G", "R", "W", "U", "B"]
var yValues = [0,0,0,0,0];
var barColors = ["green", "red", "tan", "blue", "black"];
// console.log(Decklist.length)

console.log(parse)
console.log(yValues)
//Color bar Graph


var xyValues = [];
//CmC bar graph
var valuesX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var valuesY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


