var searchMTGinput = $("#MTG-Input")
var searchCMCinput = $("CMC-Input")
var searchMTGBtn = $("#search-MTG-button")
var searchCMCbtn = $("#search-CMC-button")



$(document).on("submit", function(event){
  event.preventDefault();

 
  var searchValue = searchMTGinput.val().trim();
  var searchCMCValue = searchCMCinput.val().trim();

  currentMTGSreach(searchValue);
  currentCMCSreach(searchCMCValue);
 
  searchMTGinput.val(""); 
  searchCMCValue.val("");
});

searchMTGBtn.on("click", function (event) {
  event.preventDefault();

  // Grab value entered into search bar
  var searchValue = searchMTGinput.val().trim();

  if (searchValue == "") {
    alert("Please enter card name");
    return;
  }
  currentMTGSreach(searchValue);
  

  searchMTGinput.val("");
 
});


searchCMCbtn.on("click", function (event) {
  event.preventDefault();

  
  var searchCMCValue = searchCMCinput.val();

  if (searchValue == "") {
    alert("Please enter card name");
    return;
  }
  currentCMCSreach(searchCMCValue);
  

  searchCMCinput.val("");
 
});

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
)};

function currentCMCSreach(searchCMCValue) {
  var queryURL = 'https://api.scryfall.com/cards/search?order=cmc&q=' + searchCMCValue;
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

