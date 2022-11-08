var searchMTGinput = $("#MTG-Input")
var searchCMCinput = $("CMC-Input")
var sreachMTGBtn = $("#search-MTG-button")

$(document).on("submit", function(event){
  event.preventDefault();

 
  var searchValue = searchMTGinput.val().trim();
  var searchCMCValue = searchCMCinput.val().trim();

  currentMTGSreach(searchValue);
  currentCMCSreach(searchCMCValue);
 
  searchMTGinput.val(""); 
});

sreachMTGBtn.on("click", function (event) {
  event.preventDefault();

  // Grab value entered into search bar
  var searchValue = searchMTGinput.val().trim();
  var searchCMCValue = searchCMCinput.val();
  if (searchValue == "") {
    alert("Please enter card name");
    return;
  }
  currentMTGSreach(searchValue);
  currentCMCSreach(searchCMCValue);

  searchMTGinput.val("");
});



function currentCMCSreach(searchValue) {
  var queryURL = 'https://api.scryfall.com/cards/search?order=cmc&q=' + searchValue;
  fetch(queryURL, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      
      console.log(response);
}
)}

function currentMTGSreach(searchValue) {
  var queryURL = 'https://api.scryfall.com/cards/search?order=name&q=' + searchValue;
  fetch(queryURL, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      
    console.log(response.data[0].name)
     
}
)}