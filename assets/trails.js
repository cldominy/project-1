var apiKey = "200888904-8efae3f413dc62835561bbc84dfe257b"
var lat = 30.3451668
var lon = -97.9260464
var maxResults = 20

var queryURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxResults=${maxResults}&key=${apiKey}`

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response)
    // Generate Buttons
    for (let index = 0; index < response.trails.length; index++) {
        var trailName = response.trails[index].name
        $("#side-bar").append(`<button id="locationBttn${response.trails[index].id}" data-id=${response.trails[index].id}>${trailName} data-difficulty=${response.trails[index].difficulty} data-length=${response.trails[index].length}</button>`)
        // On-Click for Trail Buttons
            $(`#locationBttn${response.trails[index].id}`).on("click", function(){
                $("#trail-info").empty("")
                var trailID = $(this).data("id");
                console.log(trailID)
                generateTrails()
            })
        // Generate Trail Information
        function generateTrails(){
            var nameTrail = $("<p>").text(response.trails[index].name);
            var trailSummary = $("<p>").text(response.trails[index].summary)
            var trailDifficulty = $("<p>").text(response.trails[index].difficulty)
            var trailLocation = $("<p>").text(response.trails[index].location)
            var trailLength = $("<p>").text(response.trails[index].length)
            var trailStatus = $("<p>").text(response.trails[index].conditionStatus)
            var trailDetails = $("<p>").text(response.trails[index].conditionDetails)
            var trailDate = $("<p>").text(response.trails[index].conditionDate)
            $("#trail-info").append(nameTrail, trailSummary, trailDifficulty, trailLocation, trailLength, trailStatus, trailDetails, trailDate)
        }
        
    }
});



