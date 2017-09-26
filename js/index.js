//to do: get better pictures, menu to change language("x" place)

//key for weather API
var weatherApiKey = "0bc8cc1dfeedc198cbfa0c81f8673249";
var farenheit = false;
var weather;
//switch between celsius and farenheit units
function units(number, farenheit){
  // if temperature is not displayed in farenheits run formula, add units
  if(farenheit) return Math.floor(number *1.8+32)+ " &#176F";
  return number+" &#176C"
}

//set background
function setBackground(code){
  console.log(code);
  if(code=="01d"){      //clear sky day
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/rdtSFNC.jpg) fixed center/40% no-repeat");
  }
  else if(code=="01n"){      //clear sky night
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/LofxeT7.jpg) fixed center/40%");
  }
  else if(code=="02d"){      //few clouds day
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/YfZWDA9.jpg) fixed center/40%");
  }
  else if(code=="02n"){      //few clouds night
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/NRwQPcW.jpg) fixed center/40%");
  }
  else if(code=="03d"){      //scattered clouds night
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/NRwQPcW.jpg) fixed center/40%");
  }
  else if(code=="03n"){      //scattered clouds day
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/RydBdwm.jpg) fixed center/40%");
  }
  else if(code=="04d"){      //broken clouds day
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/xNSbj7N.jpg) fixed center/40%");
  }
  else if(code=="04n"){      //broken clouds night
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/NRwQPcW.jpg) fixed center/40%");
  }
  else if(code=="09d"){      //drizzle day
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://en.es-static.us/upl/2012/05/thunderstorm2_h.jpeg) fixed center/40%");
  }
  else if(code=="09n"){      //drizzle night
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), rl(http://en.es-static.us/upl/2012/05/thunderstorm2_h.jpeg) fixed center/40%");
  }
  else if(code=="10d"){      //rain day
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/G7ottOi.jpg) fixed center/40%");
  }
  else if(code=="10n"){      //rain night
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/slcAm51.jpg) fixed center/40%");
  }
  else if(code=="11d"){      //thunderstorm day
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/owfZBUD.jpg) fixed center/40%");
  }
  else if(code=="11n"){      //thunderstorm night
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/XAtplQa.jpg) fixed center/40%");
  }
  else if(code=="13d"){      //snow day
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/wCtAq9o.jpg) fixed center/40%");
  }
  else if(code=="13n"){      //snow night
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/TO6S9Wo.jpg) fixed center/40%");
  }
  else if(code=="50d"){      //mist day
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/yf6e9Ez.jpg) fixed center/40%");
  }
  else if(code=="50n"){      //mist night
    $('.weather-app').css('background', "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(http://i.imgur.com/yaL9SoI.jpg) fixed center/40%");
  }
}

//allocate API data and display
function display(weather, farenheit){
  var location=weather.name;
  var description=weather.weather[0].description;
  //call function units, so app can display both cel and far
  var temperature=units(weather.main.temp, farenheit);
  var humidity=weather.main.humidity;
  var pressure=weather.main.pressure;
  var wind=weather.wind.speed;
  var windDir=weather.wind.deg;
  //get icon id and pass it to url
  var icon=weather.weather[0].icon;
  setBackground(icon);
  var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
  //use moment.js functions to format time
  var sunrise =moment.unix(weather.sys.sunrise).format("HH:mm");
  var sunset =moment.unix(weather.sys.sunset).format("HH:mm");
      
  $('#location').html("Location: "+location);
  $('#weather').html(description);
  $('#temp').html(temperature);
  $('#humidity').html("Humidity: "+humidity+" %");
  $('#pressure').html("Pressure: "+pressure+" hPa");
  $('#wind').html("Wind: "+wind+" km/h "+windDir);
  $("#temp").prepend('<img src=' + iconUrl  + '>');
  $("#sunrise").html("Sunrise: "+sunrise);
  $("#sunset").html("Sunset: "+sunset);
}
//geolocation and weather APIs
$(function(){
  var loc;
  $.getJSON('https://ipinfo.io', function(data){
    console.log(data)
    //extract longitude and altitude from geolocation
    var loc = data.loc.split(",");
    console.log(loc);
    //call weather API
    $.getJSON('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' +loc[0]+ '&lon=' +loc[1]+'&APPID=' +weatherApiKey+ '&units=metric', function(weather){
    console.log("got the data ,", weather);
    //call display function
    display(weather, farenheit)
      //on button click switch farenheit boolean val to its opposite, call display function
      $('#switch').click(function(){
        farenheit = !farenheit;
        display(weather, farenheit);
      })
    })
  })
});

//clock
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
    var date=new Date()
    document.getElementById("date").innerHTML = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}