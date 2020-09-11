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
  let locationIcon = document.getElementById('location-icon')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position)
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ad4e5a45e55e91999a3bf297f3a10367`;

      fetch(api)
      .then(result => {
        return result.json();
      })
      .then(data => {
        console.log(data)
        const {humidity, pressure, temp, feels_like, temp_max, temp_min} = data.main;
        const {description, icon} = data.weather[0];
        temperatureDegree.textContent = temp;
        locationTimezone.textContent = data.timezone;
        locationName.textContent = data.name;
        tempMax.textContent = temp_max;
        tempMin.textContent = temp_min;
        tempHumidity.textContent = humidity;
        tempPressure.textContent = pressure;
        temperatureDescription.textContent = description;
        temperatureFeelsLike.textContent = feels_like;
        locationIcon.src=`http://openweathermap.org/img/wn/${icon}@2x.png`;
      })
    });


  }

})