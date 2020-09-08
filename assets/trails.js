var apiKey = "200888904-8efae3f413dc62835561bbc84dfe257b";
var lat = 30.3451668;
var lon = -97.9260464;
var maxResults = 20;
var apiArray = [];

var queryURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxResults=${maxResults}&key=${apiKey}`;

// Generate Dropdown Menu
function generateDropdown(trails) {
  $(".dropdown-content").empty();
  for (let index = 0; index < trails.length; index++) {
    var trailName = trails[index].name;
    // Variable for trails based on indexed
    var trailResponse = trails[index];

    //  Dropdown menu creation
    $(".dropdown-content").append(
      `<li><a class="dropdown-item trailTag"  id="locationTag${trailResponse.id}" data-index=${index}  data-id=${trailResponse.id} data-difficulty=${trailResponse.difficulty} data-length=${trailResponse.length} data-lon=${trailResponse.longitude} data-lat=${trailResponse.latitude}>${trailName}</a></li>`
    );
    // On-Click for Trail Buttons. Clears previous trail information and adds new trail information
  }
  $(`.trailTag`).on("click", function () {
    $("#trail-info").empty("");
    var trailID = $(this).data("id");
    var index = $(this).data("index");
    var lat = parseFloat(this.getAttribute("data-lat"))
    var lon = parseFloat(this.getAttribute("data-lon"))
    // Calling the map generation function from.js
    initMap(lat, lon)

    // Filters trails so that trail information is generated when clicked on
    var dropdownAPI = apiArray.filter(function (trail) {
      return trail.id === trailID;
    });
    // Calls the function to generate the called information for each trail
    generateTrails(dropdownAPI[0]);
  });
}

// Populate trail's information and calls the API
function populateTrail() {
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Assigns the global variable the API's object for all information
    apiArray = response.trails;
    // Generates Dropdown Menu for 20 Austin Trails based on the API
    generateDropdown(apiArray);
  });
}

// Generate Trail Information onto the webpage
function generateTrails(trailResponse) {
  var nameTrail = $("<p>").text(trailResponse.name);
  var trailSummary = $("<p>").text(trailResponse.summary);
  var imgURL = trailResponse.imgSmallMed
  var trailDifficulty = trailResponse.difficulty;
  //   Creating if/else for trail difficulty readability
  if (trailDifficulty === "green" || trailDifficulty === "greenBlue") {
    var trailEasy = $("<a>").text("Difficulty: Easy");
  } else if (trailDifficulty === "blue" || trailDifficulty === "blueBlack") {
    var trailModerate = $("<a>").text("Difficulty: Moderate");
  } else {
    var trailHard = $("<a>").text("Difficulty: Hard");
  }
  var trailLocation = $("<a>").text(trailResponse.location);
  var trailLength = $("<a>").text(trailResponse.length + " mile");
  var trailStatus = trailResponse.conditionStatus;
  //   Setting Trail Status and Information. Does not display trails with unknown statuses
  if (trailStatus === "Unknown") {
    var statusNone = $("<p>").text("Status unavilable for this trail");
  } else {
    var trailDate = moment(trailResponse.conditionDate).format("MMMM Do, YYYY")
    var statusTrail = $("<p>").text("Status: " + trailResponse.conditionStatus + " as of " + trailDate);
    
  }
  // Adding trail information whenever a user selects a trail
  $(".trail-info").empty()
  $(".trail-img").attr("src", imgURL)
  $(".card-title").append(
    nameTrail,
  );
  $("#trail-summary").append(
    trailSummary,
  )
  $("#status").append(
    statusNone,
    statusTrail,
  )
  $("#location").append(
    trailLocation,
  )
  $("#difficulty").append(
    trailEasy,
    trailModerate,
    trailHard,
  )
  $("#length").append(
    trailLength,
  )
}

// Filter Based on Difficulty
// Easy difficulty
$("#easyBttn").on("click", function () {
  var filterAPI = apiArray.filter(function (trail) {
    return trail.difficulty === "green" || trail.difficulty === "greenBlue";
  });

  // Generating new dropdown that filters out anything not in the user selected filter
  generateDropdown(filterAPI);
});
// Moderate difficulty
$("#moderateBttn").on("click", function () {
  var filterAPI = apiArray.filter(function (trail) {
    return trail.difficulty === "blue" || trail.difficulty === "blueBlack";
  });

  // Generating new dropdown that filters out anything not in the user selected filter
  generateDropdown(filterAPI);
});
// Hard difficulty
$("#hardBttn").on("click", function () {
  var filterAPI = apiArray.filter(function (trail) {
    return trail.difficulty === "black";
  });

  // Generating new dropdown that filters out anything not in the user selected filter
  generateDropdown(filterAPI);
});

// Filter based on length
// 0-1 Miles
$("#shortHike").on("click", function () {
  var filterAPI = apiArray.filter(function (trail) {
    return trail.length <= 1;
  });
  generateDropdown(filterAPI);
});
// 1-5 Miles
$("#mediumHike").on("click", function () {
  var newApiArray = apiArray.filter(function (trail) {
    return trail.length > 1 && trail.length <= 5;
  });
  generateDropdown(newApiArray);
});
// +5 Miles
$("#longHike").on("click", function () {
  var filterAPI = apiArray.filter(function (trail) {
    return trail.length > 5;
  });
  generateDropdown(filterAPI);
});

// Reset the Filter
$("#reset").on("click", function () {
  if (apiArray.length > 0) {
    generateDropdown(apiArray);
  } else {
    populateTrail();
  }
});

// Calling the function to assign API's object to a global variable
populateTrail();

