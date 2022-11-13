
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
const currentCardEl = $(".current-card");
const historyCardContEl = $(".history-card-container");
const cardInfoEl = $(".card-information");
const infoPowerEl = $(".info-power");
const infoToughEl = $(".info-toughness")
const infoManaCostEl = $(".info-mana-cost");
const infoCMCEl = $(".info-cmc");
const infoOracleEl = $(".info-oracle");
const infoLegalitiesEl = $(".info-legalities")
const pricingContainerEl = $(".pricing-container");
const usdEl = $("#usd")
const usdFoilEl = $("#usd-foil");
const eurEl = $("#eur");
const eurFoilEl = $("#eur-foil");
const fadeInElements = $(".fade-in");
const cardhoarderEl = $(".cardhoarder");
const cardmarketEl = $(".cardmarket");
const tcgplayerEl = $(".tcgplayer")
const newDeckBtn = $("#new-deck-btn");
const addCardBtn = $("#add-card-btn");
const saveDeckBtn = $("#save-deck-btn");
// setTimeout(function(){
//   document.body.className="preload";
// },1);

if(localStorage){
  for(let i=0;i<Object.keys(localStorage).length;i++){
    let deckName = JSON.parse(Object.keys(localStorage)[i]);
    let deckOption = document.createElement("option");
    $(deckOption).val(deckName);
    $(deckOption).text(deckName);
    console.log(deckOption.defaultSelected);
    $(".deck-list").append(deckOption);
    console.log(deckName);
    console.log("This logic works");
  }
}
$(".deck-list").on("change", function(){
  addCardBtn.prop("disabled", false);
})

let globalRetrievedData;
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
let storedData = [];
let smallCardArray = [];
var savedCards =[];

var deckSave;
var deckNameSave;
function fetchCards(apiURL){
  $("#next-results").css("visibility", "hidden");
  $(".searching-text").css("visibility", "visible");
  $(".searching-text").text("Searching...");
  fetch(apiURL)  
    .then(function (response) {
      return response.json();
    })
    .then(function(data){
      console.log(data);
      console.log(Object.values(data.data));
      for(let i=0; i<data.data.length;i++){
        storedData.push(data.data[i])
      }
      if(sessionStorage){
        sessionStorage.clear();
      }
      storeCardData();
      apiURL = data.next_page;
      if(apiURL != '' && apiURL != null){
        // fetchCards(apiURL);
        uriArray.push(apiURL);
      }
    })
    .then(function(){
      populateResults(storedData);
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
  storedData = [];
  fetchCards(uriArray[0])
  uriArray.pop();
})

function displayError(){
  // searchNamesEl.text("No results found.");
  $(".searching-text").text("No results found.")
}

function populateResults(array){
  for(let i=0;i<array.length;i++){
    let listItem = document.createElement("li");
    let listAtag = document.createElement("a");
    if(array[i].card_faces){
      listAtag.setAttribute("name", array[i].card_faces[0].name);
    }
    if(!array[i].card_faces){
    listAtag.setAttribute("name", array[i].name);
    }
    listAtag.classList.add("search-result-card");
    listAtag.textContent = array[i].name;
    namesListEl.appendChild(listItem);
    listItem.appendChild(listAtag);
    if(storedData[i].rarity == "uncommon"){
      listAtag.style.color = "transparent";
      listAtag.style.textShadow = "1px 1px 1px rgba(192, 192, 192, 0.8), 0 0 0 #222";
    }
    if(storedData[i].rarity == "common"){
      listAtag.style.color = "transparent";
      listAtag.style.textShadow = "1px 1px 1px rgba(0, 0, 0, 0.8), 0 0 0 #222";
    }
    if(storedData[i].rarity == "rare"){
      listAtag.style.color = "transparent";
      listAtag.style.textShadow = "1px 1px 1px rgba(255, 215, 0, 0.8), 0 0 0 #222";
    }
    if(storedData[i].rarity == "mythic"){
      listAtag.style.color = "transparent";
      listAtag.style.textShadow = "1px 1px 1px rgba(255, 0, 0, 0.6), 0 0 0 #222";
    }
  }

  function populateBottom(e){
    console.log(this.name);
    console.log(this);
    console.log(this.card_faces);
    let retrievedData = JSON.parse(sessionStorage.getItem(this.name));
    globalRetrievedData = retrievedData;
    $("#add-card-btn").attr("name", this.name);
    console.log(retrievedData)
    $(".card-info-header").text(retrievedData.name);
    $(".card-info-header").fadeIn();
    $(".type").text(retrievedData.type_line);
    $(".type").fadeIn();
    if(retrievedData.rarity == "uncommon"){
      $(".card-info-header").css("color", "transparent");
      $(".card-info-header").css("text-shadow", "1px 1px 1px rgba(192, 192, 192, 0.8), 0 0 0 #222")
      $(".rarity").css("color", "silver");
    }
    if(retrievedData.rarity == "common"){
      $(".card-info-header").css("color", "transparent");
      $(".card-info-header").css("text-shadow", "1px 1px 1px rgba(0, 0, 0, 0.8), 0 0 0 #222")
      $(".rarity").css("color", "black");
    }
    if(retrievedData.rarity == "rare"){
      $(".card-info-header").css("color", "transparent");
      $(".card-info-header").css("text-shadow", "1px 1px 1px rgba(255, 215, 0, 0.8), 0 0 0 #222")
      $(".rarity").css("color", "gold");
    }
    if(retrievedData.rarity == "mythic"){
      $(".card-info-header").css("color", "transparent");
      $(".card-info-header").css("text-shadow", "1px 1px 1px rgba(255, 0, 0, 0.6), 0 0 0 #222")
      $(".rarity").css("color", "red");
    }
    $(".rarity").text(capitalizeFirstLetter(retrievedData.rarity));
    $(".rarity").fadeIn();
    if(retrievedData.flavor_text){
      $(".flavor-text").text(retrievedData.flavor_text);
      $(".flavor-text").fadeIn();
    }
    $(".rarity-text").fadeIn();
    pricingContainerEl.fadeIn();
    usdEl.fadeIn();
    usdFoilEl.fadeIn();
    eurEl.fadeIn();
    eurFoilEl.fadeIn();
    if(retrievedData.prices.usd ===null){
      $("#usd").text("USD: N/A");
    }
    else{ 
      $("#usd").text("USD: $ " + (retrievedData.prices.usd));
    }
    if(retrievedData.prices.usd_foil ===null){
      $("#usd-foil").text("USD Foil: N/A");
    }
    else{ 
      $("#usd-foil").text("USD Foil: $ " + (retrievedData.prices.usd_foil));
    }
    if(retrievedData.prices.eur ===null){
      $("#eur").text("EUR: N/A");
    }
    else{ 
      $("#eur").text("EUR: 	\u20AC " + (retrievedData.prices.eur));
    }
    if(retrievedData.prices.eur_foil ===null){
      $("#eur-foil").text("EUR Foil: N/A");
    }
    else{ 
      $("#eur-foil").text("EUR Foil: 	\u20AC " + (retrievedData.prices.eur_foil));
    }
    if(retrievedData.purchase_uris){
      fadeInElements.fadeIn();
    }
    if((retrievedData.purchase_uris) && retrievedData.purchase_uris.cardhoarder){
      console.log(retrievedData.purchase_uris.cardhoarder);
      cardhoarderEl.attr("href", retrievedData.purchase_uris.cardhoarder);
      cardhoarderEl.attr("target", "_blank");
      cardhoarderEl.addClass("purch-link");
      cardhoarderEl.text("Cardhoarder")
      cardhoarderEl.fadeIn();
    }
    if((retrievedData.purchase_uris) && retrievedData.purchase_uris.cardmarket){
      console.log(retrievedData.purchase_uris.cardmarket);
      cardmarketEl.attr("href", retrievedData.purchase_uris.cardmarket);
      cardmarketEl.attr("target", "_blank");
      cardmarketEl.addClass("purch-link");
      cardmarketEl.text("Cardmarket")
      cardmarketEl.fadeIn();
    }
    if((retrievedData.purchase_uris) && retrievedData.purchase_uris.tcgplayer){
      console.log(retrievedData.purchase_uris.tcgplayer);
      tcgplayerEl.attr("href", retrievedData.purchase_uris.tcgplayer);
      tcgplayerEl.attr("target", "_blank");
      tcgplayerEl.addClass("purch-link");
      tcgplayerEl.text("TCGPlayer");
      tcgplayerEl.fadeIn();
    }
    // else{
    //   $(".retail-container").text("No purchase URL's available.");
    // }
  
    if(retrievedData.image_uris){
      fetch(retrievedData.image_uris.png)
        .then(function(response){
          console.log(response);
          return response.url;
        })
        .then(function(data){
          $(".card-image").attr("src", data);
          $(".card-image").fadeIn();
        })
        fetch(retrievedData.image_uris.small)
        .then(function(response){
          console.log(response);
          return response.url;
        })
        .then(function(data){
          if(!$("#first-small").attr("src")){
            $("#first-small").attr("src", data);
            $("#first-small").attr("name", retrievedData.name);
            smallCardArray.push(retrievedData.name);
            console.log(smallCardArray);
          }
          console.log($(".small-card").last().attr("name"));
          if(!smallCardArray.includes(retrievedData.name)){
          let smallCard = document.createElement("img")
          smallCard.setAttribute("display", "none");
          smallCard.setAttribute("src", data);
          smallCard.setAttribute("name", retrievedData.name);
          smallCard.setAttribute("draggable", "true");
          smallCard.classList.add("small-card");
          historyCardContEl.append(smallCard);
          smallCardArray.push(retrievedData.name);
          $(".small-card").fadeIn();
          $(".small-card").on("click",populateBottom);
          console.log(smallCardArray)
          }
        })
      }
        if(retrievedData.card_faces){
          fetch(retrievedData.card_faces[0].image_uris.png)
          .then(function(response){
            return response.url;
          })
          .then(function(data){
            $(".card-image").attr("src", data);
            $(".card-image").fadeIn();
          })
          fetch(retrievedData.card_faces[0].image_uris.small)
          .then(function(response){
            console.log(response);
            return response.url;
          })
          .then(function(data){
            if(!$("#first-small").attr("src")){
              $("#first-small").attr("src", data);
              $("#first-small").attr("name", retrievedData.card_faces[0].name);
              smallCardArray.push(retrievedData.card_faces[0].name);
            }
            console.log($(".small-card").last().attr("name"));
            if(!smallCardArray.includes(retrievedData.card_faces[0].name)){
            let smallCard = document.createElement("img")
            smallCard.setAttribute("display", "none");
            smallCard.setAttribute("src", data);
            smallCard.setAttribute("name", retrievedData.card_faces[0].name);
            smallCard.setAttribute("draggable", "true");
            smallCard.classList.add("small-card");
            historyCardContEl.append(smallCard);
            smallCardArray.push(retrievedData.card_faces[0].name);
            $(".small-card").fadeIn();
            $(".small-card").on("click",populateBottom);
            }
          })
          }
    //Appending/populating Card Info data into the Card Information Div.
    if(retrievedData.power){
      infoPowerEl.text("Power: " + retrievedData.power);
      infoPowerEl.fadeIn();
    }
    if(retrievedData.toughness){
      infoToughEl.text("Toughness: " + retrievedData.toughness);
      infoToughEl.fadeIn();
    }
    if(retrievedData.mana_cost){
      infoManaCostEl.text("Mana Cost: "+ retrievedData.mana_cost);
      infoManaCostEl.fadeIn();
    }
    if(retrievedData.cmc){
      infoCMCEl.text("Converted Mana Cost: " + retrievedData.cmc);
      infoCMCEl.fadeIn();
    }
    if(retrievedData.oracle_text){
      infoOracleEl.text("Oracle Text: " + retrievedData.oracle_text);
      infoOracleEl.fadeIn();
    }
    // if(retrievedData.legalities){
    //   infoLegalitiesEl.text(
    //     "Alchemy: " + retrievedData.legalities.alchemy +
    //     "\n Brawl: " + retrievedData.legalities.brawl +
    //     "\n Commander: " + retrievedData.legalities.commander +
    //     "\n Duel: " + retrievedData.legalities.duel +
    //     "\n Explorer: " + retrievedData.legalities.explorer +
    //     "\n future: " + retrievedData.legalities.future

    //   );
    //   infoLegalitiesEl.fadeIn();
    // }
  
  }
  $("a").on("click",populateBottom);
};

function storeCardData(){
  for(let i=0; i<storedData.length;i++){
    if(storedData[i].card_faces){
      sessionStorage.setItem((storedData[i].card_faces[0].name), JSON.stringify(storedData[i]));
    }
    if(!storedData[i].card_faces){
    sessionStorage.setItem((storedData[i].name), JSON.stringify(storedData[i]));
    }
  }
}

const resultsAreaEl = $(".search-results");
const searchNamesEl = $(".search-names");


function clearResults(){
  let listItems = document.querySelectorAll(".search-result-card");
  let listItemslist = document.querySelectorAll("li");
  for(let i=0;i<storedData.length;i++){
    listItemslist[i].removeChild(listItems[i]);
    namesListEl.removeChild(listItemslist[i]);
  }
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
var newDeckCounter = 0;
var repeatCounter = 2;
var deckArray = [];
function createDeck(e){
  console.log(/\s/.test($("#new-deck").val()));
  if($("#new-deck").val().replace(/\s/g, '').length==0){
    $("#new-deck").val('');
    return;
  }
  if($("#new-deck").val()!=""){
    addCardBtn.prop("disabled", false);
    if(newDeckCounter===0){
    let newDeckOptionEl = document.createElement("option");
    newDeckOptionEl.classList.add("deck-option");
    newDeckOptionEl.textContent = $("#new-deck").val();
    $(".deck-list").append(newDeckOptionEl);
    deckArray.push(newDeckOptionEl.textContent);
    console.log("click");
    console.log(newDeckCounter);
    }
    if(newDeckCounter>0){
      if(deckArray.includes($("#new-deck").val())){
        let newDeckOptionEl = document.createElement("option");
        newDeckOptionEl.classList.add("deck-option");
        if((newDeckCounter+2)>repeatCounter){
          newDeckOptionEl.textContent = ($("#new-deck").val())+ " #" + repeatCounter;
          $(".deck-list").append(newDeckOptionEl);
          console.log(newDeckCounter);
          repeatCounter++;
        }
      }
      if(!deckArray.includes($("#new-deck").val())){
        let newDeckOptionEl = document.createElement("option");
        newDeckOptionEl.classList.add("deck-option");
        newDeckOptionEl.textContent = $("#new-deck").val();
        $(".deck-list").append(newDeckOptionEl);
        deckArray.push(newDeckOptionEl.textContent);
        console.log("click");
        repeatCounter = 2;
      }
    }
    $("#new-deck").val('');
    newDeckCounter++
  } 
}
let savedSavedDeck;
newDeckBtn.on("click", createDeck);
//push decks to array so local storage clear() in fetch cards doesnt delete them, can be stored again in local storage.
saveDeckBtn.on("click", function(){
  
  if(!localStorage.getItem(JSON.stringify($(".deck-list option:selected").val()))){
  console.log("false");
  console.log("click");
  $(".deactive").fadeToggle(100).delay(3000).fadeToggle();
  let deckOptions = document.querySelectorAll(".deck-option");
  let savedDeck = savedCards;
  console.log("NOT WORKING");
  console.log(savedDeck);
  localStorage.setItem(JSON.stringify($(".deck-list option:selected").val()), JSON.stringify(savedDeck));
  savedCards=[];
  }
  else{
    let temp = localStorage.getItem(JSON.stringify($(".deck-list option:selected").val()));
    let tempParsed = JSON.parse(temp);
    for(let i=0;i<savedCards.length;i++){
    tempParsed.push(savedCards[i]);
    };
    console.log(tempParsed);
    console.log("WORKING");
    localStorage.setItem(JSON.stringify($(".deck-list option:selected").val()), JSON.stringify(tempParsed));
    savedCards=[];
  }

});
$("#add-card-btn").on("click", function(e){
  e.stopPropagation;
  e.preventDefault;
  console.log("click");
  console.log($("#add-card-btn").attr("name"));
  $("#add-card-message").text("Card added to deck: " + $(".deck-list option:selected").text() + "!");
  $("#add-card-message").animate({opacity: 100}, 300).delay(1000).animate({opacity: 0}, 300);
  //We want the user to be able to put multiples of the same card in a deck, so not including logic to counteract that.
  savedCards.push(globalRetrievedData);
})

function createDeckObj(obj, property, value){
  obj[property] = value;
}

if($(".deck-list").val("")){
  addCardBtn.prop("disabled", true);
  console.log("true");
}

document.getElementById("cmc-search-btn").addEventListener("click", function(event){
  event.preventDefault();
  clearResults();
  storedData=[];
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
