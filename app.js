window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');

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
        const {humidity, pressure, temp, temp_max, temp_min} = data.main;
        temperatureDegree.textContent = temp;
        locationTimezone.textContent = data.timezone;
        console.log(data.timezone)
        temperatureDescription.textContent = data.weather[0].description
      })
    });


  }

})