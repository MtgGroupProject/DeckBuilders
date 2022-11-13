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


      //   {
      //     "html_attributions" : [],
      //     "next_page_token" : "AW30NDz_RqtRWkS5VgwpB-60ckOEw9z2L-ck4cn38kwFLb0f4AICgDfxr8XHwLB3c4EYXm6bAgJUzgXP-eFIy-XVf1XX83_5fE8mkM1ha6pOg0cstbsb8XfWGe24lxGMpxjrS9d-Or_xinNBOI84JiOXBLBLNhHaD2TvDzjS8jcgRxkRX3FyhhWNJFg0_xjtH7rWPmtSG9DpWH3UQ2uYc5boWUobfdmbbbOwMVrcxhmIQcyccJ-CFHCyRb75Sg8IUFspN12Nyeo8lYqdHRaNFCaakOvC1MOr6w4M1nUSRM5rkTrmXXNSx3alIngFTJQrm2j0qCw9AfKA6kgs2ztD7xgXzSNuEjCa8Sk1YY4B3eDLvEtBvHe1JUnhg5fmsPli1of8RU7ZR2Fwzhuv2lZEaFWcPd5zwJvToCTA1XYVcviKvqCBuKr0HMjWreNfoFzvl6EW_hwFQSHIPiP7E8GYHZz8h4SFf8pYdVEC",
      //     "results" : [
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "5550 N Broadway, Chicago, IL 60640",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.9833194,
      //                 "lng" : -87.6603406
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.98466052989272,
      //                    "lng" : -87.65888507010727
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.98196087010727,
      //                    "lng" : -87.66158472989272
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Chicagoland Games Dice Dojo",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 3120,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/106547444566268126201\"\u003eA Google User\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDyJSS14Kp8W6zkp3yiA7OtrlNd8M_iM_WqA1oD3xo7MgtWQ4MH7Qnm2eKkFa71XkYi4Nfmg4x8IdAQIcgzi8woK-Q38w3iwyTmCdBQ2SwNLh1jwV9QgyV5-ykVCIlkByLVWeS-a5uoO7dkfgPd7A0oIEuU0Yj7l5N1Bc6TjA9gk8_K3",
      //                 "width" : 4160
      //              }
      //           ],
      //           "place_id" : "ChIJL5eg5ILRD4gR4KueuYF9buw",
      //           "plus_code" : {
      //              "compound_code" : "X8MQ+8V Chicago, Illinois",
      //              "global_code" : "86HJX8MQ+8V"
      //           },
      //           "rating" : 4.9,
      //           "reference" : "ChIJL5eg5ILRD4gR4KueuYF9buw",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 1108
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "1145 W Webster Ave, Chicago, IL 60614",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.9215649,
      //                 "lng" : -87.6576494
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.92297402989272,
      //                    "lng" : -87.65629687010727
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.92027437010728,
      //                    "lng" : -87.65899652989272
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Good Games Chicago",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 3936,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/117527240591685328121\"\u003eXander J\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDyixt5i_aJvUaZRWRzQK-PEAgd_N9q3cYv_54p2UpgjzciuuM796jIGcjkH5Z9YPvFhKmdT-c6ah96LXpei0UmLeUWipM-Azld_ewhKYAjvEkKI_DjVjrFuGSkq2p_IAdrCjc_unxVFo7Y4Qzrs2JIhoB0PAf8yUyI23DDoPiDVcUWZ",
      //                 "width" : 5248
      //              }
      //           ],
      //           "place_id" : "ChIJF6er8R3TD4gRAckaoBhED8c",
      //           "plus_code" : {
      //              "compound_code" : "W8CR+JW Chicago, Illinois",
      //              "global_code" : "86HJW8CR+JW"
      //           },
      //           "rating" : 4.9,
      //           "reference" : "ChIJF6er8R3TD4gRAckaoBhED8c",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 298
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "835 Michigan Ave floor 4, Chicago, IL 60611",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.8981494,
      //                 "lng" : -87.6238681
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.89962157989272,
      //                    "lng" : -87.62226987010727
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.89692192010727,
      //                    "lng" : -87.62496952989272
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Gamers World",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 2322,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/105540075613246136180\"\u003eGamers World - Water Tower\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDzQFeg1HHwlAa1lk5hp9FPZzAXa2TWaDEvoP2g4bZVF0sZAtEbxPCTIYY1JA8TKQW5OAgYycD944qgWFIzrtNhvAnL74KiPzOaS6BQYC5suMyz4aC5M5VWXn0hZIfqA2HU8D2HvM2B2nqCdOgO4q8tf_CYPfCCJHqmSKBFQ-OTDHpCK",
      //                 "width" : 4128
      //              }
      //           ],
      //           "place_id" : "ChIJnxrEZFTTD4gRABeP0vZLuLc",
      //           "plus_code" : {
      //              "compound_code" : "V9XG+7F Chicago, Illinois",
      //              "global_code" : "86HJV9XG+7F"
      //           },
      //           "rating" : 4,
      //           "reference" : "ChIJnxrEZFTTD4gRABeP0vZLuLc",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 159
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "1116 N Milwaukee Ave, Chicago, IL 60642",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.9019687,
      //                 "lng" : -87.6645039
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.90332972989272,
      //                    "lng" : -87.66319382010728
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.90063007010728,
      //                    "lng" : -87.66589347989273
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Spellbound Games",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 3024,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/102938874034945232328\"\u003eMarco Ordonez\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDwddyx5l8aBnGy666jIwGgnS2MTFijplNhZ4DejtdP-cagnbfJIvX-KzPxqyqqh9Jz5BrwlCCn9KVC7XXTCrqHGXkhuyzDqVfxi_fk3WkpJacN1l1h2tk69Z4dXru0RPbAIh3frwUipzqB1N5DxsZowSL5yCSpG68eENHmQmp_KyfbY",
      //                 "width" : 4032
      //              }
      //           ],
      //           "place_id" : "ChIJEe6qghrTD4gRzeNChka2Nh0",
      //           "plus_code" : {
      //              "compound_code" : "W82P+Q5 Chicago, Illinois",
      //              "global_code" : "86HJW82P+Q5"
      //           },
      //           "rating" : 5,
      //           "reference" : "ChIJEe6qghrTD4gRzeNChka2Nh0",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 6
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "2248 W Irving Park Rd, Chicago, IL 60618",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.9542443,
      //                 "lng" : -87.6854735
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.95559282989272,
      //                    "lng" : -87.68424137010727
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.95289317010728,
      //                    "lng" : -87.68694102989272
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "The Gaming Goat - Wrigleyville",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 3000,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/117910738454203778579\"\u003eJason Ruger\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDxAmA_qhb1-jxMK2VMezc_pPN_QQlyUInOWKH35x6KJvh2tn18kmfatvE-5arbpANpZJtP3ZC1diY-itHUnA-X-AEsj7ztc6df0J6oq1_X4ricE5xKfk1G96A39WmIyQL3tQlFP9vzVXtK0OllaBrLQDcaKFR5CqwOmAQi3V5ZAyEm4",
      //                 "width" : 4000
      //              }
      //           ],
      //           "place_id" : "ChIJDaOq12zTD4gR46FaVtSaSNo",
      //           "plus_code" : {
      //              "compound_code" : "X837+MQ Chicago, Illinois",
      //              "global_code" : "86HJX837+MQ"
      //           },
      //           "rating" : 4.8,
      //           "reference" : "ChIJDaOq12zTD4gR46FaVtSaSNo",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 12
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "3804 N Western Ave, Chicago, IL 60618",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.9505623,
      //                 "lng" : -87.68857249999999
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.95190317989272,
      //                    "lng" : -87.68715397010727
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.94920352010728,
      //                    "lng" : -87.68985362989272
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Galaxy Comic Zone",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 2336,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/109573039240885407556\"\u003eEvan McNish\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDzfZgYGrlYzhbv2W2NOv9lDyrq4TfESjRil4BnaXEChK5QzekG3etpFmNihU_Y0E1BRaLeDAXbpNNMykkeiwjm8OUF7oVztOKDQ90LIcyVRV458ioNiQcuR2xqt6YrwqIfBvOcSxaAgwv4TgVoQDV0HvJRJFD4tUv8xdAyxArH3ow-m",
      //                 "width" : 4160
      //              }
      //           ],
      //           "place_id" : "ChIJva5x8XHSD4gRuSGaIdGPjuo",
      //           "plus_code" : {
      //              "compound_code" : "X826+6H Chicago, Illinois",
      //              "global_code" : "86HJX826+6H"
      //           },
      //           "rating" : 4.1,
      //           "reference" : "ChIJva5x8XHSD4gRuSGaIdGPjuo",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 108
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "2249 W Irving Park Rd, Chicago, IL 60618",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.9538368,
      //                 "lng" : -87.6855211
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.95527847989273,
      //                    "lng" : -87.68417292010727
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.95257882010728,
      //                    "lng" : -87.68687257989271
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "NC Games",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 3024,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/110942903609650712824\"\u003eTran\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDyffVJKS6ttTarSBmOO-uX2Re6tYv6-iJ9EpBiPu6ENSqD94M-BZveGNas4iI10q1Op3aqO4wsMVNiCTIBfbLOEHZ7Qv2GkWzYXPEtEGUCbswcsOFvMN_MKKy9VBEuO5azPUxWM1TX6iDzrqeNJ1RP4CXkI6AKg7Dt_6t85gd9dGuEg",
      //                 "width" : 4032
      //              }
      //           ],
      //           "place_id" : "ChIJbegFiWfTD4gRp_AHpwv3uDE",
      //           "plus_code" : {
      //              "compound_code" : "X837+GQ Chicago, Illinois",
      //              "global_code" : "86HJX837+GQ"
      //           },
      //           "rating" : 4,
      //           "reference" : "ChIJbegFiWfTD4gRp_AHpwv3uDE",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 13
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "3736 W Lawrence Ave, Chicago, IL 60625",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.96842669999999,
      //                 "lng" : -87.7221474
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.96972237989272,
      //                    "lng" : -87.72075402010728
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.96702272010727,
      //                    "lng" : -87.72345367989273
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "EmporiumTCG",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 4032,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/112479662873940221086\"\u003eDamian Vazquez\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDwCbWnoRQ5mFZcUtgkk3RviykxGXU1PNwveAQiX9VghcxcIjODDzc2VRynGLnYRR_HW6B8lo0YP-sDZxeAP-8PtFhXQxYoRkKbGfCpI_2MVnPeuae7wlCedl_tT7YuzqJcHb22NIT2EAE9qs8jac1ET5UvgHZ4zPOw6p5X6wIxwmY2q",
      //                 "width" : 3024
      //              }
      //           ],
      //           "place_id" : "ChIJO3wsxU7ND4gRJo4LTcVJB7s",
      //           "plus_code" : {
      //              "compound_code" : "X79H+94 Chicago, Illinois",
      //              "global_code" : "86HJX79H+94"
      //           },
      //           "rating" : 4.5,
      //           "reference" : "ChIJO3wsxU7ND4gRJo4LTcVJB7s",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 66
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "436 S Ridgeland Ave, Oak Park, IL 60302",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.8804162,
      //                 "lng" : -87.7842502
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.88176647989272,
      //                    "lng" : -87.78292272010728
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.87906682010728,
      //                    "lng" : -87.78562237989273
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Grandmaster Games - Oak Park",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 720,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/110381339828660393402\"\u003eThe Gaming Goat\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDxIeYqlXe8cg-mLlCRif_pUK0-wVWDeSkwg2TK4MJH9c9-GMP0QrXWdF6WtZxpCRjvXbIEO2F253lF7mXpNdnxS7AJWY4-AMweIdMYqhqDdG3tOSoTewXebd6p2Q2Rzm1TLyrPkNyvnE9YyN9JoMZx5P8CVIkJrKG4T2rTgVOMdbJ7z",
      //                 "width" : 960
      //              }
      //           ],
      //           "place_id" : "ChIJW9hz8KI0DogRSw9d8HfUplM",
      //           "plus_code" : {
      //              "compound_code" : "V6J8+48 Oak Park, Illinois",
      //              "global_code" : "86HJV6J8+48"
      //           },
      //           "rating" : 4.6,
      //           "reference" : "ChIJW9hz8KI0DogRSw9d8HfUplM",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 256
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "4405 N Milwaukee Ave, Chicago, IL 60630",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.9608042,
      //                 "lng" : -87.75445929999999
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.96220432989272,
      //                    "lng" : -87.75317427010728
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.95950467010728,
      //                    "lng" : -87.75587392989272
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Maximum Distractions",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 2448,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/105929225533560701861\"\u003eAlex Tayra\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDw6zuuyNIkA5ht35xl0WElACb-w-jQUypq9jRAs8f4PGImSA3cpF3IyGndNL-MeetIJZRON33akw-8b_Pl9fqXkG5YJk8cBQw60non4deheKQMPjcD0UqLRI-U3851E-14wai0ny2BNC661tvJ0QudEzOPwku18SdDrccVJniLp4M7d",
      //                 "width" : 3264
      //              }
      //           ],
      //           "place_id" : "ChIJX8hUWT7MD4gRar5-6v_zzuY",
      //           "plus_code" : {
      //              "compound_code" : "X66W+86 Chicago, Illinois",
      //              "global_code" : "86HJX66W+86"
      //           },
      //           "rating" : 4.6,
      //           "reference" : "ChIJX8hUWT7MD4gRar5-6v_zzuY",
      //           "types" : [ "book_store", "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 136
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "1142 W Taylor St, Chicago, IL 60607",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.8695335,
      //                 "lng" : -87.65596359999999
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.87083367989272,
      //                    "lng" : -87.65459752010727
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.86813402010728,
      //                    "lng" : -87.65729717989272
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "First Aid Comics",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 3480,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/108000745920178118547\"\u003eJason Cadell\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDx-LRPHIrtwtZzEQo3BQW8XmPMqAyOHxILoC_2kNd8W9KrgzvyZ7V5ctkF9M3pqkDm0DeC9927jm6Ii6jhspMz0f6KVIaOzSaGNrqeqDAQZNS2xSEUUI9KnvEfcRMlk3pBnZ5UDbEFYqkvWlfYtoyg63O4zX7xvxmDkF0dlrMRk8UkG",
      //                 "width" : 4640
      //              }
      //           ],
      //           "place_id" : "ChIJezBgSeIsDogRbF-CQ5qmFAw",
      //           "plus_code" : {
      //              "compound_code" : "V89V+RJ Chicago, Illinois",
      //              "global_code" : "86HJV89V+RJ"
      //           },
      //           "rating" : 4.8,
      //           "reference" : "ChIJezBgSeIsDogRbF-CQ5qmFAw",
      //           "types" : [ "book_store", "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 325
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "233 Golf Mill Drive Entrance, 8, Niles, IL 60714",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 42.0492316,
      //                 "lng" : -87.8378891
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 42.05056042989273,
      //                    "lng" : -87.83658947010728
      //                 },
      //                 "southwest" : {
      //                    "lat" : 42.04786077010728,
      //                    "lng" : -87.83928912989273
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Pastimes Comics & Games",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 3024,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/100648098622423190821\"\u003eEric Taylor\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDxslero37zjgvIunq0IA1EazrU2O81Ad6VYWuZ9infDKN0o5cpvuBoJ-2ar7XV1Lct0kuiMhSAMOyyak-2YEu_2BLdUm77416aC40pLzY_2KvZdMBPTs2fbFX0YLEf8N_pK0cySSnUJ28HECmT0kCkFMVjGhh7e9-uOqOQqe-rZyYM",
      //                 "width" : 4032
      //              }
      //           ],
      //           "place_id" : "ChIJp3_J6HTID4gRzZ8W3mWddLE",
      //           "plus_code" : {
      //              "compound_code" : "25X6+MR Niles, Illinois",
      //              "global_code" : "86JJ25X6+MR"
      //           },
      //           "rating" : 4.5,
      //           "reference" : "ChIJp3_J6HTID4gRzZ8W3mWddLE",
      //           "types" : [ "book_store", "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 440
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "2028 W Montrose Ave, Chicago, IL 60618",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.9615564,
      //                 "lng" : -87.6801892
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.96284427989272,
      //                    "lng" : -87.67883947010728
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.96014462010728,
      //                    "lng" : -87.68153912989271
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Elite Sportscards & Comics",
      //           "opening_hours" : {
      //              "open_now" : false
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 3072,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/103848042790865850804\"\u003eRonnie Holloway\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDxAAcu2OUhZsx8T4UkImhwqwaZ2ePVNmFExneDZUEfaOacqIjhwgyMfsPJeaBFIwuDTh9FCPd_mlmcp6gYsAORBK7UqPuon1MyLso2TGvV9ljsTeu6-ebo7flKbzE4zb-1jppCuZTQqreWsbNEv2Elsq4_iHsssJkkQrzfeu-QP_15A",
      //                 "width" : 4096
      //              }
      //           ],
      //           "place_id" : "ChIJuzHkYhbSD4gRudRYSQeZ3Oc",
      //           "plus_code" : {
      //              "compound_code" : "X869+JW Chicago, Illinois",
      //              "global_code" : "86HJX869+JW"
      //           },
      //           "rating" : 4.2,
      //           "reference" : "ChIJuzHkYhbSD4gRudRYSQeZ3Oc",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 105
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "4835 Main St, Skokie, IL 60077",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 42.0333949,
      //                 "lng" : -87.7486662
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 42.03472327989272,
      //                    "lng" : -87.74731647010728
      //                 },
      //                 "southwest" : {
      //                    "lat" : 42.03202362010728,
      //                    "lng" : -87.75001612989271
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "The Chicago Clubhouse",
      //           "opening_hours" : {
      //              "open_now" : false
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 3024,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/100852052240431096706\"\u003eАртём Некрасов\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDz1-vwjImAQ7jw1GI9K7cECfi7NVzVwHqTf1Qs5RZJSHFGFsjKhWpn8g6-BW23nz-cAUj3vTyNdORyOABhPvdKU1tTE4vcIxt6RVh84BuByW6L8MME0xcZFRkGaODpPZe7fICKtcuUvA5RYfExc7sRyLq_DyYlgeokrgO-2WQn9WWX7",
      //                 "width" : 4032
      //              }
      //           ],
      //           "place_id" : "ChIJaWbq70LGD4gRVbgCDgAC9SY",
      //           "plus_code" : {
      //              "compound_code" : "27M2+8G Skokie, Illinois",
      //              "global_code" : "86JJ27M2+8G"
      //           },
      //           "rating" : 4.4,
      //           "reference" : "ChIJaWbq70LGD4gRVbgCDgAC9SY",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 37
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "3417 W Peterson Ave, Chicago, IL 60659",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.9900895,
      //                 "lng" : -87.71471199999999
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.99155247989272,
      //                    "lng" : -87.71336812010728
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.98885282010728,
      //                    "lng" : -87.71606777989271
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Zombie Unicorn Comics",
      //           "opening_hours" : {
      //              "open_now" : false
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 480,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/115439122126815703482\"\u003eA Google User\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDxM7G8YFv0_4HgnLLqYLUVxIHCu0vIM4OiQMQDqyffvK8WDYkZRngTblAOoDBlvazcYNIAdI_jRoziFSL0nMgRSKIxDvUgXv3kd6d2g5AGYdpsNsRKbGJtpVD-CzpSSYKWCvxwfjyuACWNXcjDrJTV32S8VrSrRmDV14oGVtrhMc7zO",
      //                 "width" : 640
      //              }
      //           ],
      //           "place_id" : "ChIJ7XieSlLPD4gRxBScy-oQgow",
      //           "plus_code" : {
      //              "compound_code" : "X7RP+24 Chicago, Illinois",
      //              "global_code" : "86HJX7RP+24"
      //           },
      //           "rating" : 4.8,
      //           "reference" : "ChIJ7XieSlLPD4gRxBScy-oQgow",
      //           "types" : [ "book_store", "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 51
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "19 South La Grange Road, La Grange, IL 60525",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.8152401,
      //                 "lng" : -87.8694716
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.81659712989273,
      //                    "lng" : -87.86820312010728
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.81389747010729,
      //                    "lng" : -87.87090277989273
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Fair Game",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 4000,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/110195186962429816298\"\u003eA Google User\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDw0fTkFInkJsLWKPSabOjeGQbm_lCKZsd-PVLqxWnjxbPhORaIVllTSjKWfKIrurZmVdAkq6-TbRdlECvBRqoxzsUvHQcefFDWZE_1H3xqqILFgqgq2sjppmcmW-KjWvE64nTTG9MqZyRlogsa1Fyl5nl1cQ0XEHE00o6dfyEmDIPjC",
      //                 "width" : 6000
      //              }
      //           ],
      //           "place_id" : "ChIJCWOhltBJDogROi5DQPtpH6A",
      //           "plus_code" : {
      //              "compound_code" : "R48J+36 La Grange, Illinois",
      //              "global_code" : "86HJR48J+36"
      //           },
      //           "rating" : 4.9,
      //           "reference" : "ChIJCWOhltBJDogROi5DQPtpH6A",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 107
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "5304 N Clark St, Chicago, IL 60640",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.9781957,
      //                 "lng" : -87.6684875
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.97953912989272,
      //                    "lng" : -87.66710352010728
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.97683947010728,
      //                    "lng" : -87.66980317989272
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "AlleyCat Comics",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 1000,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/107431339690599456536\"\u003eAlleycat Comics\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDyJ7kF1_2u9ZRQ2jnGCppk9_FZxAX4h0pk4AWFcyv4xVRidizUHWcwt3HiPsHh01_veWm_W5yHr00_6NgONZC8QG-5BRGCemo5m2HZxyG2c0B_v--uKkSz0RmJc4Ya-b-4ULuzl6V5YDbBTfQvBYZ6xoPIp0RpcGg_jMHDJUZgUyxYq",
      //                 "width" : 1500
      //              }
      //           ],
      //           "place_id" : "ChIJJRrKZUvSD4gR47-ooJ0UFKc",
      //           "plus_code" : {
      //              "compound_code" : "X8HJ+7H Chicago, Illinois",
      //              "global_code" : "86HJX8HJ+7H"
      //           },
      //           "rating" : 4.9,
      //           "reference" : "ChIJJRrKZUvSD4gR47-ooJ0UFKc",
      //           "types" : [ "book_store", "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 394
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "5144 N Harlem Ave, Harwood Heights, IL 60706",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.9739004,
      //                 "lng" : -87.80741850000001
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.97525422989272,
      //                    "lng" : -87.80589277010728
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.97255457010728,
      //                    "lng" : -87.80859242989271
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "The Gaming Goat",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 3024,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/105987944665516370957\"\u003eA Google User\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDxLavjvrLbhmeaLuXQKc5nlJoY9A8YIg8yOwaewvwkNf-Zr91YrNyHkKADyscCbRquLfV2MqBmWnzhcUmgREiLrEpv7CLNfXejRumMR9_fq_dirEoNlNGbk90xh69ymff1tm0TyRmnf_fJ7c5AT6ImSGK73ZsmMNWsuRfNgu2QTdlPl",
      //                 "width" : 4032
      //              }
      //           ],
      //           "place_id" : "ChIJv6SrWAPJD4gROBBz95hHAQ4",
      //           "plus_code" : {
      //              "compound_code" : "X5FV+H2 Harwood Heights, Illinois",
      //              "global_code" : "86HJX5FV+H2"
      //           },
      //           "rating" : 4.4,
      //           "reference" : "ChIJv6SrWAPJD4gROBBz95hHAQ4",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 196
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "77 E Madison St, Chicago, IL 60602",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.881957,
      //                 "lng" : -87.62495
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.88338402989273,
      //                    "lng" : -87.62360472010727
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.88068437010728,
      //                    "lng" : -87.62630437989272
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Graham Crackers Comics Loop",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 3456,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/108000745920178118547\"\u003eJason Cadell\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDzExvU8SO0OaErfGBdSPAkUVOPUBdraEbeKEP8rWh8F7qmyo-eHV6fnG8BnjdqxkgBWTVGsI9IgacOy3SPoxsU0jDnyFa0exI1SBCeC2oOjKRDvdbp26Ew8bMFgq1U0N7QMWBquMi7qNuOecJ2um9eN2DPHBWnUMEYJQ7gmEsYYrylD",
      //                 "width" : 4608
      //              }
      //           ],
      //           "place_id" : "ChIJfXKoR6QsDogRAOfPeh2B4FI",
      //           "plus_code" : {
      //              "compound_code" : "V9JG+Q2 Chicago, Illinois",
      //              "global_code" : "86HJV9JG+Q2"
      //           },
      //           "rating" : 4.6,
      //           "reference" : "ChIJfXKoR6QsDogRAOfPeh2B4FI",
      //           "types" : [ "book_store", "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 1217
      //        },
      //        {
      //           "business_status" : "OPERATIONAL",
      //           "formatted_address" : "6954 W 111th St, Worth, IL 60482",
      //           "geometry" : {
      //              "location" : {
      //                 "lat" : 41.69021800000001,
      //                 "lng" : -87.7935665
      //              },
      //              "viewport" : {
      //                 "northeast" : {
      //                    "lat" : 41.69149977989272,
      //                    "lng" : -87.79213057010729
      //                 },
      //                 "southwest" : {
      //                    "lat" : 41.68880012010728,
      //                    "lng" : -87.79483022989272
      //                 }
      //              }
      //           },
      //           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      //           "icon_background_color" : "#4B96F3",
      //           "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      //           "name" : "Critical Games",
      //           "opening_hours" : {
      //              "open_now" : true
      //           },
      //           "photos" : [
      //              {
      //                 "height" : 1440,
      //                 "html_attributions" : [
      //                    "\u003ca href=\"https://maps.google.com/maps/contrib/110637789287384517223\"\u003eHanan Malas\u003c/a\u003e"
      //                 ],
      //                 "photo_reference" : "AW30NDx1ocOL2zP6C7PrDeWgz3V-thlWXHvNxYXduG4So-o1QdW2UNjOFSF9Ur9GDMUwV5b09iWR0OlOO9o-sAGOPlRtyleeG3D5lcfoEmoEfrF64JwB2CDV_ZS37wczDk_r2WNiTxyPrEWbzmvpjp2XVQa9wmW8C4prhuQQVSNdQhjS3j_y",
      //                 "width" : 1440
      //              }
      //           ],
      //           "place_id" : "ChIJk0x-l6g5DogRvccwIxIBJEw",
      //           "plus_code" : {
      //              "compound_code" : "M6R4+3H Worth, Illinois",
      //              "global_code" : "86HJM6R4+3H"
      //           },
      //           "rating" : 4.9,
      //           "reference" : "ChIJk0x-l6g5DogRvccwIxIBJEw",
      //           "types" : [ "store", "point_of_interest", "establishment" ],
      //           "user_ratings_total" : 37
      //        }
      //     ],
      //     "status" : "OK"
      //  }