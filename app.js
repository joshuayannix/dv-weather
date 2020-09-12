window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let locationName = document.querySelector('.location-name');
  let temperatureFeelsLike = document.querySelector('.temperature-feels_like');
  let tempMax = document.querySelector('.temp-max');
  let tempMin = document.querySelector('.temp-min');
  let tempHumidity = document.querySelector('.humidity');
  let tempPressure = document.querySelector('.pressure');
  let locationIcon = document.getElementById('location-icon');
  let locationCountry = document.querySelector('.location-country');
  let locationSunrise = document.querySelector('.location-sunrise');
  let locationSunset = document.querySelector('.location-sunset');
  let windDeg = document.querySelector('.wind-deg');
  let windSpeed = document.querySelector('.wind-speed');

  const convertTemp = kelvin => {
    let farenheight = (kelvin - 273.15) * 9/5 + 32;
    return Math.round(farenheight);
  };

  const convertTimezone = timezone => {
    switch (timezone) {
      case -14400 :
        return 'Eastern';
      case -18000 :
        return 'Central';
      case -21600 :
        return 'Mountain';
      case -25200 :
        return 'Pacific';
    }
  };

  const convertTimestamp = timestamp => {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();
    let seconds = '0' + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  };

  async function getWeather(api) {
    try {
      const result = await fetch(api);
      const data = await result.json();
      console.log(data)
      const {humidity, pressure, temp, feels_like, temp_max, temp_min} = data.main;
      const {description, icon} = data.weather[0];
      const {country, sunrise, sunset} = data.sys;
      const {deg, speed} = data.wind;
      windDeg.textContent = deg;
      windSpeed.textContent = Math.round(speed * 2.237);
      locationCountry.textContent = country;
      temperatureDegree.textContent = convertTemp(temp);
      locationSunrise.textContent = convertTimestamp(sunrise);
      locationSunset.textContent = convertTimestamp(sunset);
      locationTimezone.textContent = convertTimezone(data.timezone);
      locationName.textContent = data.name;
      tempMax.textContent = convertTemp(temp_max);
      tempMin.textContent = convertTemp(temp_min);
      tempHumidity.textContent = humidity;
      tempPressure.textContent = pressure;
      temperatureDescription.textContent = description;
      temperatureFeelsLike.textContent = feels_like;
      locationIcon.src=`http://openweathermap.org/img/wn/${icon}@2x.png`;
    } catch(error) {
      console.log(error)
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position)
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ad4e5a45e55e91999a3bf297f3a10367`;

      getWeather(api)
    });
  }

})