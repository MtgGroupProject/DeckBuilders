// myStr.split(" — ")[0]
var Decklist = []
var DeckNames = [];
var retrievedDecks = [];
for(let i=0; i < Object.keys(localStorage).length;i++){
let decklist = localStorage.getItem(Object.keys(localStorage)[i]);
let parsed = JSON.parse(decklist);
let keys = Object.keys(localStorage);
let names = JSON.parse(keys[i]);
DeckNames.push(names);
Decklist.push(JSON.parse(decklist));
}

const listEl = document.querySelector("#savedDecks")

for(let i=0; i < DeckNames.length;i++){
    let keyName = localStorage.getItem(JSON.stringify(DeckNames[i]));
    let parse = JSON.parse(keyName)
  
    retrievedDecks.push(parse);
}
for(let i = 0; i < DeckNames.length;i++){
  let listItemEl = document.createElement("li")
  let listArcEl = document.createElement("a")
 
  $(listItemEl).val(DeckNames[i])
  listArcEl.textContent = DeckNames[i]
 
  listEl.appendChild(listItemEl)
  listItemEl.appendChild(listArcEl)
  
  listArcEl.classList.add("classy")

}

let temp = ""
let parse = []
$(".classy").on("click",function(e){
 temp = localStorage.getItem(JSON.stringify($(this).text()))
 parse = JSON.parse(temp)
 console.log(parse)
 console.log(parse[0].colors.length)
 for (i = 0; i < parse.length; i++) {
  for (j = 0; j < parse[i].colors.length; j++) {
    console.log("this is work")
    if (parse[i].colors[j] == "G") {
      yValues[0] = yValues[0] + 1;
      console.log(yValues[0])
    }
    if (parse[i].colors[j] == "R") {
      yValues[1] = yValues[1] + 1;
      console.log(yValues[1])
    }
    if (parse[i].colors[j] == "W") {
      yValues[2] = yValues[2] + 1;
      console.log(yValues[2])
    }
    if (parse[i].colors[j] == "U") {
      yValues[3] = yValues[3] + 1;
      console.log(yValues[3])
    }
    if (parse[i].colors[j] == "B") {
      yValues[4] = yValues[4] + 1;
      console.log(yValues[4])
    }
  }
}
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
for (let i = 0; i <  parse.length; i++) {
  for (let j = 0; j < parse.length; j++) {
    console.log(i)
    console.log(parse[j].cmc == i);
    if(parse[j].cmc == i) {
      valuesY[i] = valuesY[i] + 1
    }
  }
}

console.log(valuesX);
console.log(valuesY);

new Chart("myChart2", {
  type: "bar",
  data: {
    labels: valuesX,
    datasets: [
      {
        backgroundColor: "black",
        data: valuesY,
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


