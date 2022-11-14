var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var zipcode = document.querySelector('#zipcode').value;
//Geocoding API
  var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode + '&key=AIzaSyBQAOk0W2SlKiP_6sSlIBYz_H8XHL-1-DM';
  fetch(geoUrl)
    .then(function (responseGeo) {
      return responseGeo.json();
    })
    .then(function (dataGeo) {
      var latGeo = dataGeo.results[0].geometry.location.lat;
      var lngGeo = dataGeo.results[0].geometry.location.lng;
      console.log(latGeo);
      console.log(lngGeo); 
     //Places API
      var mapUrl = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=magic:+the+gathering&location=' + latGeo +','+ lngGeo + '&radius=5000&region=us&type=store&key=AIzaSyBQAOk0W2SlKiP_6sSlIBYz_H8XHL-1-DM';
      fetch(mapUrl)
        .then(function (responseMap) {
          return responseMap.json();
        })
        .then(function (dataMap) {
        console.log(dataMap);
      //Initialize Map
      var map;
      var service;
      var infowindow;
      var placeInput = new google.maps.LatLng(latGeo, lngGeo);
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: placeInput,
        zoom: 11
      })
      for (var i = 0; i < dataMap.results.length; i++) {
        var marker = new google.maps.Marker({
          map: map,
          position: dataMap.results[i].geometry.location,
          title: dataMap.results[i].name   
        })
        marker.setMap(map)
      }
    }  
    initMap();
    })
    })}

searchFormEl.addEventListener('click', handleSearchFormSubmit);
