// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN4MuTsPTRzJXZ8LtbbVacFdg3qNmRBxg&callback=initMap';
script.defer = true;

// Attach your callback function to the `window` object
window.initMap = function(lattitude, longitude) {
  // Initialize and add the map
// function initMap(lattitude, longitude) {
    // The location of Trail Location
    var trailLocation = {lat: 30.3451668, lng: -97.9260464};
    if (lattitude && longitude){
       trailLocation = {lat: lattitude, lng: longitude};
    }
    
    // The map, centered at Trail Location
    var map = new google.maps.Map(
        document.getElementById('gMap'), {zoom: 12, center: trailLocation});
    // The marker, positioned at Trail Location
    var marker = new google.maps.Marker({position: trailLocation, map: map});
  // }
  document.getElementById("trailTag").addEventListener("click", function(){
      var lat = parseFloat(this.getAttribute("data-lat"))
      var lon = parseFloat(this.getAttribute("data-lon"))
      console.log(lat)
      initMap(lat, lon)
  })
};

// Append the 'script' element to 'head'
document.head.appendChild(script);
      

