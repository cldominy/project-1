// 40961afd2ab5d2926debb895b0f079e9 - API keys

let austinToday = "https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=40961afd2ab5d2926debb895b0f079e9"


$.get(austinToday, function (todayData) {
    console.log(todayData);
    let temp = todayData.main.temp;
    let icon = todayData.weather[0].icon;
    console.log(icon);
    let iconTodayUrl = "http://openweathermap.org/img/wn/" + icon + ".png";

    $(".today-weather").text(temp + "F");
    $(".today-weather").append("<img src=" + iconTodayUrl + ">");


});


