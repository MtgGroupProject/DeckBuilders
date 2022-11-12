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

      var map;
      var service;
      var infowindow;

      function initialize() {
        var placeInput = new google.maps.LatLng(latGeo, lngGeo);

        map = new google.maps.Map(document.getElementById('map'), {
          center: placeInput,
          zoom: 15
        });

        var request = {
          location: placeInput,
          radius: '500',
          keyword: 'magic: the gathering',
          type: ['store']
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
      }

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }
      initialize();
    })
}

// createMarker(){
//   const marker = new google.maps.Marker({
//     position: results[i].,
//     map: map,
// })

searchFormEl.addEventListener('click', handleSearchFormSubmit);

        // var geoArray = [];
        // geoArray.push(latGeo);
        // geoArray.push(lngGeo);
        // return geoArray;

        //Places API
        // var mapUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=magic:+the+gathering&location=' + latGeo + ',' + lngGeo + '&radius=2000&region=us&type=store&key=AIzaSyBQAOk0W2SlKiP_6sSlIBYz_H8XHL-1-DM';

        //     .then(function (array) {
        //       var mapUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=magic:+the+gathering&location=' + array[0] + ',' + array[1] + '&radius=2000&region=us&type=store&key=AIzaSyBQAOk0W2SlKiP_6sSlIBYz_H8XHL-1-DM';
        //       console.log(mapUrl);
        //       fetch(mapUrl, {
        //         method: 'GET',
        //         header: { "Access-Control-Allow-Origin": '*' }
        //         //   credentials: 'same-origin', // incl,ude, *same-origin, omit
        //         //   redirect: 'follow' // manual, *follow, error
        //       })
        //         .then(function (responseMap) {
        //           console.log(responseMap);
        //           return responseMap;
        //         })
        //         .then(function (dataMap) {
        //           console.log(dataMap);
        //         })
        //     })