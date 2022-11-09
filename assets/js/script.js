
//*****************||      = is %3D | + is + | : is %3A | > is >  ! is %21    ||************************************\\



// OMITTING SUBTYPES BECAUSE THERE'S LITERALLY HUNDREDS, MATT WHAT HAVE YOU MADE US DO!
const superType = ["basic", "legendary", "ongoing", "snow", "world"];

const fullText = {
    string: "q=",
    colorIs: "c%3A",
    color: ["w", "u", "r", "b", "g", "c"],
    typeIs: "t%3A",
    type: ["merfolk", "legend", "creature", "artifact", "enchantment", "land", "planeswalker", "instant", "sorcery", superType,],
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
const colorlessCheckBox = $("#colorless");
const restOfCheckboxes = $(".checkbox-1");
const forestCheckBox = $("#forest");
const islandCheckBox = $("#island");
const swampCheckBox = $("#swamp");
const plainsCheckBox = $("#plains");
const mountainCheckBox = $("#mountain");
const orderDropDownEl = document.querySelector(".search-order");
const searchHeaderEl = $(".search-header");
const namesListEl = document.querySelector(".names-list");
const cmcHeaderBtn = $(".btn-cmc");
const orderHeaderBtn = $(".btn-order");


let checkBoxObj = {};

colorlessCheckBox.on("click",function(e){
  const checkbox = e.target;
  const checked = checkbox.checked;
  if(checked){
    checkBoxObj.colorless = "colorless";
  }
  if(!checked){
    delete checkBoxObj.colorless;
  }
});
forestCheckBox.on("click",function(e){
  const checkbox = e.target;
  const checked = checkbox.checked;
  if(checked){
    checkBoxObj.forest = "forest";
  }
  if(!checked){
    delete checkBoxObj.forest;
  }
});
islandCheckBox.on("click",function(e){
  const checkbox = e.target;
  const checked = checkbox.checked;
  if(checked){
    checkBoxObj.island = "island";
  }
  if(!checked){
    delete checkBoxObj.island;
  }
});
swampCheckBox.on("click",function(e){
  const checkbox = e.target;
  const checked = checkbox.checked;
  if(checked){
    checkBoxObj.swamp = "swamp";
  }
  if(!checked){
    delete checkBoxObj.swamp;
  }
});
plainsCheckBox.on("click",function(e){
  const checkbox = e.target;
  const checked = checkbox.checked;
  if(checked){
    checkBoxObj.plains = "plains";
  }
  if(!checked){
    delete checkBoxObj.plains;
  }
});
mountainCheckBox.on("click",function(e){
  const checkbox = e.target;
  const checked = checkbox.checked;
  if(checked){
    checkBoxObj.mountain = "mountain";
  }
  if(!checked){
    delete checkBoxObj.mountain;
  }
});


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

  if(checkBoxObj.forest){
    manaColor = manaColor + fullText.color[4];
  }
  if(checkBoxObj.island){
    manaColor = manaColor + fullText.color[1]
  }
  if(checkBoxObj.swamp){
    manaColor = manaColor + fullText.color[3]
  }
  if(checkBoxObj.plains){
    manaColor = manaColor + fullText.color[0]
  }
  if(checkBoxObj.mountain){
    manaColor = manaColor + fullText.color[2]
  }
  if(checkBoxObj.colorless){
    manaColor = manaColor + fullText.color[5]
  }

  console.log(cmcost);
  if (/\s/.test(cardName)) {
    cardName = "%22" + cardName + "%22";
  }
  orderHeaderBtn.css("display", "initial");
  orderHeaderBtn.text(orderHeaderBtn.attr("name") + " = " + orderDropDownEl.options[orderDropDownEl.selectedIndex].text);
  if(cmc && !name){
   finishedURL = searchBase + qString + cmcost;
   $(".btn-cmc").css("display", "initial");
   $(".btn-cmc").text($(".btn-cmc").attr("name") + " = " + cmcEl.val())
  }
  if(name && !cmc){
    finishedURL = searchBase + qString + fullText.cardNameIs + cardName;
  }
  if(name && cmc){
    finishedURL = searchBase + qString + fullText.cardNameIs + cardName;
  }
  if(color && cmc && !name){
    finishedURL = searchBase + qString + fullText.colorIs + manaColor + "+" + cmcost;
    if( colorlessCheckBox.is(":checked")){
      $(".btn-colorless").css("display", "initial");
      $(".btn-colorless").text(colorlessCheckBox.attr("name"))
    }
    if( forestCheckBox.is(":checked")){
      $(".btn-forest").css("display", "initial");
      $(".btn-forest").text(forestCheckBox.attr("name"))
    }
    if( islandCheckBox.is(":checked")){
      $(".btn-island").css("display", "initial");
      $(".btn-island").text(islandCheckBox.attr("name"))
    }
    if( swampCheckBox.is(":checked")){
      $(".btn-swamp").css("display", "initial");
      $(".btn-swamp").text(swampCheckBox.attr("name"))
    }
    if( plainsCheckBox.is(":checked")){
      $(".btn-plains").css("display", "initial");
      $(".btn-plains").text(plainsCheckBox.attr("name"))
    }
    if( mountainCheckBox.is(":checked")){
      $(".btn-mountain").css("display", "initial");
      $(".btn-mountain").text(mountainCheckBox.attr("name"))
    }
    if( !colorlessCheckBox.is(":checked")){
      $(".btn-colorless").css("display", "none");
    }
    if( !forestCheckBox.is(":checked")){
      $(".btn-forest").css("display", "none");
    }
    if( !islandCheckBox.is(":checked")){
      $(".btn-island").css("display", "none");
    }
    if( !swampCheckBox.is(":checked")){
      $(".btn-swamp").css("display", "none");
    }
    if( !plainsCheckBox.is(":checked")){
      $(".btn-plains").css("display", "none");
    }
    if( !mountainCheckBox.is(":checked")){
      $(".btn-mountain").css("display", "none");
    }
  }
  if(color && cmc && name){
    finishedURL = searchBase + qString + fullText.cardNameIs + cardName;
  }
  if(order && cmc && !color && !name){
    console.log($(".btn-order"));
    finishedURL = searchBase + orderObj.string + order + "&" + qString + cmcost;
    cmcHeaderBtn.css("display", "initial");
    cmcHeaderBtn.text(cmcHeaderBtn.attr("name") + " = " + cmcEl.val());
  }
  if(order && cmc && color && !name){
    finishedURL = searchBase + orderObj.string + order + "&" + qString + cmcost + fullText.colorIs + manaColor;
  }
  if(order && cmc && color && name){
    finishedURL = searchBase + qString + fullText.cardNameIs + cardName;
  }
  if(order && !cmc && color && !name){
    finishedURL = searchBase + orderObj.string + order + "&" + qString + fullText.colorIs + manaColor;
    if( colorlessCheckBox.is(":checked")){
      $(".btn-colorless").css("display", "initial");
      $(".btn-colorless").text(colorlessCheckBox.attr("name"))
    }
    if( forestCheckBox.is(":checked")){
      $(".btn-forest").css("display", "initial");
      $(".btn-forest").text(forestCheckBox.attr("name"))
    }
    if( islandCheckBox.is(":checked")){
      $(".btn-island").css("display", "initial");
      $(".btn-island").text(islandCheckBox.attr("name"))
    }
    if( swampCheckBox.is(":checked")){
      $(".btn-swamp").css("display", "initial");
      $(".btn-swamp").text(swampCheckBox.attr("name"))
    }
    if( plainsCheckBox.is(":checked")){
      $(".btn-plains").css("display", "initial");
      $(".btn-plains").text(plainsCheckBox.attr("name"))
    }
    if( mountainCheckBox.is(":checked")){
      $(".btn-mountain").css("display", "initial");
      $(".btn-mountain").text(mountainCheckBox.attr("name"))
    }
    if( !colorlessCheckBox.is(":checked")){
      $(".btn-colorless").css("display", "none");
    }
    if( !forestCheckBox.is(":checked")){
      $(".btn-forest").css("display", "none");
    }
    if( !islandCheckBox.is(":checked")){
      $(".btn-island").css("display", "none");
    }
    if( !swampCheckBox.is(":checked")){
      $(".btn-swamp").css("display", "none");
    }
    if( !plainsCheckBox.is(":checked")){
      $(".btn-plains").css("display", "none");
    }
    if( !mountainCheckBox.is(":checked")){
      $(".btn-mountain").css("display", "none");
    }
  }
  return finishedURL;
};


let namesArray = [];
let uriArray = [];

function fetchCards(apiURL){
  $("#next-results").css("visibility", "hidden");
  $(".searching-text").css("visibility", "visible");
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
        // fetchCards(apiURL);
        uriArray.push(apiURL);
      }
    })
    .then(function(){
      populateResults(namesArray);
      if(uriArray.length>0){
      $("#next-results").css("visibility", "visible");
      };
      $(".searching-text").css("visibility", "hidden");
      if(uriArray.length===0){
        $("#next-results").css("visibility", "hidden");
      }
    })
    .catch(function(error){
      console.log(error.message);
      displayError();
    })
};


$("#next-results").click(function(){
  clearResults();
  namesArray = [];
  fetchCards(uriArray[0])
  uriArray.pop();
})

function displayError(){
  searchNamesEl.text("No results found.");
  $(".searching-text").css("visibility", "hidden");
}

function populateResults(array){
  for(let i=0;i<array.length;i++){
    let listItem = document.createElement("li");
    let listAtag = document.createElement("a")
    listAtag.textContent = array[i];
    namesListEl.appendChild(listItem);
    listItem.appendChild(listAtag);
  }
}

const resultsAreaEl = $(".search-results");
const searchNamesEl = $(".search-names");


function clearResults(){
  let listItems = document.querySelectorAll("a");
  let listItemslist = document.querySelectorAll("li");
  for(let i=0;i<namesArray.length;i++){
    listItemslist[i].removeChild(listItems[i]);
    namesListEl.removeChild(listItemslist[i]);
  }
}



document.getElementById("cmc-search-btn").addEventListener("click", function(event){
  event.preventDefault();
  clearResults();
  namesArray=[];
  let builtURL = urlConstructor(orderDropDownEl.value, fullText.string, checkBoxObj, cmcEl.val(), null, cardNameEl.val());
  let fetchedNames = fetchCards(builtURL);
  console.log(builtURL);
  cmcEl.val("");
  cardNameEl.val("");
  uriArray=[];
});


colorlessCheckBox.change(function(){
  forestCheckBox.prop("disabled", colorlessCheckBox.filter(":checked").length);
  islandCheckBox.prop("disabled", colorlessCheckBox.filter(":checked").length);
  swampCheckBox.prop("disabled", colorlessCheckBox.filter(":checked").length);
  plainsCheckBox.prop("disabled", colorlessCheckBox.filter(":checked").length);
  mountainCheckBox.prop("disabled", colorlessCheckBox.filter(":checked").length);
});

$(".checkbox-1").change(function(){
  colorlessCheckBox.prop("disabled", $(".checkbox-1").filter(":checked").length);
})

$(".checkbox-1").change(function(){
  $(".search-order").prop("disabled", $(".checkbox-1").filter(":checked").length<1);
});
$(".checkbox-1").change();

colorlessCheckBox.change(function(){
  $(".search-order").prop("disabled", colorlessCheckBox.filter(":checked").length<1);
})

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
