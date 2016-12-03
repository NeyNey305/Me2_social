$(function () {

  var map;
  $(function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: new google.maps.LatLng(2.8,-187.3),
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
    // Do something with the results
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();

    $.ajax('http://services.familywatchdog.us/rest/json.asp?key=YOUR-KEY-HERE&type=searchbylatlong&minlat=' + latitude + '&maxlat=' + latitude + '&minlong=' + longitude + '&maxlong=' + latitude,
      {
        success: function(data) {
          console.log(data["offenders"]);
        }
      });
    });
  });
});
