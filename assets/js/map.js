var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var zipcode = document.querySelector('#zipcode').value;

  console.log(zipcode);

  if (!zipcode) {
    console.error('You need a search input value!');
    return;
  }

  var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode + '&key=AIzaSyBQAOk0W2SlKiP_6sSlIBYz_H8XHL-1-DM';
  //Geocoding API
  fetch(geoUrl)
    .then(function (responseGeo) {
      return responseGeo.json();
    })
    .then(function (dataGeo) {
      console.log(dataGeo);
      for (var i = 0; i < dataGeo.length; i++) {
        var latGeo = dataGeo[i].results.geometry.location.lat;
        var lngGeo = dataGeo[i].results.geometry.location.lng;
        console.log(latGeo);
        console.log(lngGeo);
      }
      //Places API
      function getPlaces() {
        var mapUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=magic:+the+gathering&location=' + latGeo + ',' + lngGeo + '&radius=2000&region=us&type=store&key=AIzaSyBQAOk0W2SlKiP_6sSlIBYz_H8XHL-1-DM';

        fetch(mapUrl)
          .then(function (responseMap) {
            return responseMap.json();
          })
          .then(function (dataMap) {
            console.log(dataMap);
          });
      }
    });
}

searchFormEl.addEventListener('click', handleSearchFormSubmit);

// Initialize and add the map and markers for places
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

window.initMap = initMap;