const apiUrl = "http://api.weatherapi.com/v1/current.json?&q=";
const apiKey = "357553c67b3d4eb38f655229230108";
const searchValue = document.querySelector(".input-btn");
const searchButton = document.querySelector(".search-logo");
const imageChange = document.querySelector(".weather-img");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&key=${apiKey}`);
  const data = await response.json();
  console.log(data);
  if(city!=data.location.name){
    alert('Invalid City name');
  }
  else{
    document.querySelector('.city').innerHTML = data.location.name;
    document.querySelector('.temperature').innerHTML = data.current.temp_c + "°C";
    document.querySelector('.percentage-humidity').innerHTML = data.current.humidity + "%";
    document.querySelector('.wind-speed').innerHTML = data.current.wind_kph + "Km/h";

    const weatherConditionCode = data.current.condition.code;
    const iconUrl = getIconUrl(weatherConditionCode);
    imageChange.src = iconUrl;
  }
  
}

function getIconUrl(weatherConditionCode) {
  const iconMap = {
    1000: "image/sun.png",
    1003: "image/cloudy.png",
    1276:"image/rainy-day.png",
    1030:"image/mist.png"
   
  };
  const defaultIcon = "image/default.png";
  return iconMap[weatherConditionCode] || defaultIcon;
}

searchButton.addEventListener("click", () => {
  if (searchValue.value === '') {
    alert("Invalid City");
  } else {
    checkWeather(searchValue.value);
  }
});
