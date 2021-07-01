// Weather
let weather = {
  apiKey: '236bb9928c645c117743a4ca95d2f3b6',
  fetchWeather: function (city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + this.apiKey)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector('.city').innerText = 'Weather in ' + name;
    document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + '℃';
    document.querySelector('.humidity').innerText = 'Humidity : ' + humidity + '%';
    document.querySelector('.wind').innerText = 'Wind speed : ' + speed + ' km/h';
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    weather.search();
  }
});

// weather.fetchWeather('Tokyo');
var defaultWeather = 'Tokyo';

// Geo IP
fetch('https://json.geoiplookup.io', { 'Content-type': 'application/json' })
  .then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((GeoipResponse) => {
    var regional = GeoipResponse.region;
    weather.fetchWeather(regional);
  })
  .catch((error) => {
    weather.fetchWeather(defaultWeather);
    console.warn('There was a problem when fetching the data!', error);
  });
