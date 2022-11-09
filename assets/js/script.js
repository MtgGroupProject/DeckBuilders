
//*****************||      = is %3D | + is + | : is %3A | > is >  ! is %21    ||************************************\\



// OMITTING SUBTYPES BECAUSE THERE'S LITERALLY HUNDREDS, MATT WHAT HAVE YOU MADE US DO!
const superType = ["basic", "legendary", "ongoing", "snow", "world"];

const fullText = {
    string: "q=",
    colorIs: "c%3A",
    color: ["w", "u", "r", "b", "g", "c"],
    typeIs: "t%3A",
    type: ["merfolk", "legend", "goblin", "creature", "artifact", "enchantment", "land", "planeswalker", "instant", "sorcery", superType,],
    manaCostIs: "m%3A",
    manaCost: {
      generic: ["1","2","3","4","5","6","7","8","9","10","11","12","13"],
      white: ["W", "WW", "WWW", "WWWW", "WWWWW", "WWWWWW", "WWWWWWW","WWWWWWWW", "WWWWWWWWW", "WWWWWWWWWW"],
      green: ["G", "GG","GGG","GGGG","GGGGG","GGGGGG","GGGGGGG","GGGGGGGG","GGGGGGGGG","GGGGGGGGGG"],
      blue: ["U","UU","UUU","UUUU","UUUUU","UUUUUU","UUUUUUU","UUUUUUUU","UUUUUUUUU","UUUUUUUUUU"],
      red: ["R","RR","RRR","RRRR","RRRRR","RRRRRR","RRRRRRR","RRRRRRRR","RRRRRRRRR","RRRRRRRRRR"],
      black: ["B","BB","BBB","BBBB","BBBBB","BBBBBB","BBBBBBB","BBBBBBBB","BBBBBBBBB","BBBBBBBBBB"]
    },
    convManaCost: ["cmc%3D0", "cmc%3D1", "cmc%3D2", "cmc%3D3", "cmc%3D4", "cmc%3D5", "cmc%3D6", "cmc%3D7" ,"cmc%3D8" ,"cmc%3D9" ,"cmc%3D10" ,"cmc%3D11" ,"cmc%3D12" ,"cmc%3D13" ,"cmc%3D14","cmc%3D15", "cmc%3D16"],
    cardNameIs: "%21"
};
const orderObj = {
  string: "order=",
  options: ["name", "set", "released", "rarity", "usd", "tix", "eur", "power", "toughness", "edhrec", "penny", "artist", "review"]
};

const searchBase = "https://api.scryfall.com/cards/search?"

const cardNameEl = $("#MTG-Input");
const cmcEl = $("#CMC-Input");
const dropDownEl = document.querySelector(".mana-filter");
const orderDropDownEl = document.querySelector(".search-order");
const searchHeaderEl = $(".search-header");

// If card name search has multiple words, syntax: !"multiple-word-name-here"
function urlConstructor(order, qString, color, cmc, type, name){
  let cmcost = "";
  let finishedURL =""
  let cardName = name;
  let manaColor = "";
  for(let i=0;i<fullText.convManaCost.length;i++){
    if(cmc == i){
      cmcost = fullText.convManaCost[i];
    }
  }

  if(color =="Forest"){
    manaColor = fullText.color[4]
  }
  if(color =="Island"){
    manaColor = fullText.color[1]
  }
  if(color =="Swamp"){
    manaColor = fullText.color[3]
  }
  if(color =="Plains"){
    manaColor = fullText.color[0]
  }
  if(color =="Mountain"){
    manaColor = fullText.color[2]
  }
  if(color =="Colorless"){
    manaColor = fullText.color[5]
  }

  console.log(cmcost);
  if (/\s/.test(cardName)) {
    cardName = "%22" + cardName + "%22";
  }
  if(cmc && !name){
   finishedURL = searchBase + qString + cmcost;
   searchHeaderEl.text("Search Results: (CMC = " + cmcEl.val() + ")");
  }
  if(name && !cmc){
    finishedURL = searchBase + qString + fullText.cardNameIs + cardName;
  }
  if(name && cmc){
    finishedURL = searchBase + qString + fullText.cardNameIs + cardName;
  }
  if(color && !cmc && !name){
    finishedURL = searchBase + qString + fullText.colorIs + manaColor;
    searchHeaderEl.text("Search Results: (" + dropDownEl.options[dropDownEl.selectedIndex].text + ")");
  }
  if(color && cmc && !name){
    finishedURL = searchBase + qString + fullText.colorIs + manaColor + "+" + cmcost;
    searchHeaderEl.text("Search Results: (" + dropDownEl.options[dropDownEl.selectedIndex].text + ")" +  ", (CMC = " + cmcEl.val() + ")");
  }
  if(color && cmc && name){
    finishedURL = searchBase + qString + fullText.cardNameIs + cardName;
  }
  if(order && cmc && !color && !name){
    finishedURL = searchBase + orderObj.string + order + "&" + qString + cmcost;
    searchHeaderEl.text("Search Results: (Order = " + orderDropDownEl.options[orderDropDownEl.selectedIndex].text + ")" +  ", (CMC = " + cmcEl.val() + ")");
  }
  if(order && cmc && color && !name){
    finishedURL = searchBase + orderObj.string + order + "&" + qString + cmcost + fullText.colorIs + manaColor;
    searchHeaderEl.text("Search Results: (Order = " + orderDropDownEl.options[orderDropDownEl.selectedIndex].text + ")" +  ", (CMC = " + cmcEl.val() + ")" + ", (" + dropDownEl.options[dropDownEl.selectedIndex].text + ")");
  }
  if(order && cmc && color && name){
    finishedURL = searchBase + qString + fullText.cardNameIs + cardName;
  }
  if(order && !cmc && color && !name){
    finishedURL = searchBase + orderObj.string + order + "&" + qString + fullText.colorIs + manaColor;
    searchHeaderEl.text("Search Results: (Order = " + orderDropDownEl.options[orderDropDownEl.selectedIndex].text + ")" + ", (" + dropDownEl.options[dropDownEl.selectedIndex].text + ")");

  }
  else{
    searchNamesEl.text("Searching...");
  }
  return finishedURL;
};


let namesArray = [];
function fetchCards(apiURL){
  fetch(apiURL)  
    .then(function (response) {
      return response.json();
    })
    .then(function(data){
      for(let i=0; i<data.data.length;i++){
        namesArray.push(data.data[i].name);
      }
      apiURL = data.next_page;
      if(apiURL != '' && apiURL != null){
        fetchCards(apiURL);
      }
    })
    .then(function(){
      populateResults(namesArray);
    })
    .catch(function(error){
      console.log(error.message);
      displayError();
    })
    return namesArray;
};
function displayError(){
  searchNamesEl.text("No results found.");
}

function populateResults(array){
  let joinedArray = array.join(", ");
  console.log(joinedArray);
  searchNamesEl.text(joinedArray);
}

const resultsAreaEl = $(".search-results");
const searchNamesEl = $(".search-names");


document.getElementById("cmc-search-btn").addEventListener("click", function(){
  namesArray=[];
  let builtURL = urlConstructor(orderDropDownEl.value, fullText.string, dropDownEl.options[dropDownEl.selectedIndex].text, cmcEl.val(), null, cardNameEl.val());
  let fetchedNames = fetchCards(builtURL);
  console.log(builtURL);
  cmcEl.val("");
  cardNameEl.val("");
});

$(".mana-filter").on("change", function(){
  if($(".mana-filter").val()){
    $(".search-order").attr("disabled", false);
  }
  if(!$(".mana-filter").val()){
    $(".search-order").attr("disabled", true);
  }
});

$("#CMC-Input").on("keyup", function(){
  if($("#CMC-Input").val()){
    $(".search-order").attr("disabled", false);
  }
  if(!$("#CMC-Input").val()){
    $(".search-order").attr("disabled", true);
  }
});
$("#MTG-Input").on("keyup", function(){
  if($("#MTG-Input").val()){
    $(".search-order").attr("disabled", false);
  }
  if(!$("#MTG-Input").val()){
    $(".search-order").attr("disabled", true);
  }
});