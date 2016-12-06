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
    var maxlat = (latitude + 0.04);
    var longitude = results[0].geometry.location.lng();
    var maxlng = (longitude + 0.04);
    //Keep this code to test address response function
    // console.log(results[0]);

    console.log('http://services.familywatchdog.us/rest/json.asp?key='+ WATCH_DOG_KEY +'&type=searchbylatlong&minlat=' + latitude + '&maxlat=' + maxlat + '&minlong=' + longitude + '&maxlong=' + maxlng)

    $.ajax('http://services.familywatchdog.us/rest/json.asp?key='+ WATCH_DOG_KEY +'&type=searchbylatlong&minlat=' + latitude + '&maxlat=' + maxlat + '&minlong=' + longitude + '&maxlong=' + maxlng,
      { success: function(data) {
          var offenderAddresses = [];
          for(var i = 0; i < data["offenders"].length; i++){
            //add new marker witth off latlng to map
          var marker = new google.maps.Marker({
            map: map,
            // position: data["offenders"][i]
            position: {lat: parseFloat(data["offenders"][i]["latitude"]), lng: parseFloat(data["offenders"][i]["longitude"])},
            // title:
          });

var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' +data["offenders"][i]["name"] + '</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Information</b><br> </p>'+
            '<p>' +data["offenders"][i]["name"] + '</p>'+
            '<image-url=" +data["offenders"][i]["photo"]"" + </img-url>'+
            '<p>' +data["offenders"][i]["height"] + '</p>'+
            '<p>' +data["offenders"][i]["weight"] + '</p>'+
            '<p>' +data["offenders"][i]["age"] + '</p>'+
            '<p>' +data["offenders"][i]["race"] + '</p>'+
            '<p>' +data["offenders"][i]["sex"] + '</p>'+
            '<p>' +data["offenders"][i]["street1"] + '</p>'+
            '<p>' +data["offenders"][i]["state"] + '</p>'+
            '<p>' +data["offenders"][i]["zipcode"] + '</p>'+
            '</div>'+
            '</div>';
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          marker.addListener("click", function() {
            infowindow.open(map,marker);
          });
            // Keep this code below to test functionality of result data
            console.log(data["offenders"][i]);
            //Keep this below to test latitude result return
            // console.log(parseFloat(data["offenders"][i]["latitude"]));
          }
        }
      });
    });
  });
});
