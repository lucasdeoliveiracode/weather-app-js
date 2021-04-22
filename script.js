window.addEventListener("load", () => {
    let long;
    let lat;
    let locationIcon = document.querySelector(".weather-icon");
    let temperatureDescription = document.querySelector(".temp-description");
    let temperatureDegree = document.querySelector(".temp-degree");
    let temperatureTimezone = document.querySelector(".location-timezone");

    // GET WEATHER FROM API PROVIDER
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b86fd8f7708187a762619d1377a88ec7`;

            //get the information from the api
            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const { feels_like } = data.main;
                    const { description } = data.weather[0];
                    const { icon } = data.weather[0];

                    //DOM Elements from the API
                    temperatureDegree.textContent = feels_like;
                    temperatureDescription.textContent = description;
                    temperatureTimezone.textContent = data.name;
                    locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
                });
        });
    }
});
