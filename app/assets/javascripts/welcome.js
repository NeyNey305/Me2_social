$(function () {
//creates map
  var map;
  $(function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(25.8,-80.2),
      mapTypeId: 'terrain'
    });
  });

  $('#create_location').click(function() {
    var street = $('#street').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var zip_code = $('#zip_code').val();
    var formData = street + " " + city + ", " + state + " " + zip_code;

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: formData}, function(results, status) {
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();

    //Keep this code to test address response function
    // console.log(results[0]);
    $.ajax('http://services.familywatchdog.us/rest/json.asp?key=YOUR-KEY-HERE&type=searchbylatlong&minlat=' + latitude + '&maxlat=' + latitude + '&minlong=' + longitude + '&maxlong=' + latitude,
      { success: function(data) {
          var offenderAddresses = [];
          for(var i = 0; i < data["offenders"].length; i++){
            //add new marker witth off latlng to map
          var marker = new google.maps.Marker({
            map: map,
            // position: data["offenders"][i]
            position: {lat: parseFloat(data["offenders"][i]["latitude"]), lng: parseFloat(data["offenders"][i]["longitude"])},
          })
            // Keep this code below to test functionality of result data
            // console.log(data["offenders"][i]);
            //Keep this below to test latitude result return
            // console.log(parseFloat(data["offenders"][i]["latitude"]));

          }
        }
      });
    });
  });
});
