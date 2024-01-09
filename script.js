fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
        let countryDetails = [];

        for (let i = 0; i < data.length; i++) {
            let country = {
                Name: data[i].name.common,
                flags: data[i].flags.svg,
                capital: data[i].capital ? data[i].capital[0] : "N/A",
                region: data[i].region,
                countrtycode: data[i].cca3,
                subregion: data[i].subregion,
                population: data[i].population,
                lat: data[i].latlng[0],
                lng: data[i].latlng[1],
            };
            countryDetails.push(country);
        }
        return countryDetails;
    })
    .then(data1 => {
        const container = document.createElement("div");
        container.setAttribute("class", "container");

        const h1 = document.createElement("h1");
        h1.setAttribute("id", "title");
        h1.setAttribute("class", "text-center");
        h1.innerText = "Rest Countries";

        const row = document.createElement("div");
        row.setAttribute("class", "row");

        for (let i = 0; i < data1.length; i++) {
            let column = document.createElement("div");
            column.setAttribute("class", "col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4");

            let card = document.createElement("div");
            card.setAttribute("class", "card h-100");

            let cardheader = document.createElement("div");
            cardheader.setAttribute("class", "card-header");
            cardheader.innerHTML = `<h5 class="text-center">${data1[i].Name}</h5>`;

            let cardbody = document.createElement("div");
            cardbody.setAttribute("class", "card-body");

            let img = document.createElement("img");
            img.setAttribute("src", data1[i].flags);
            img.setAttribute("class", "card-img-top mb-3");
            img.setAttribute("alt", "...");

            let cardtext = document.createElement("div");
            cardtext.setAttribute("class", "card-text");
            cardtext.innerHTML = `<p>Capital : ${data1[i].capital}</p>
                                <p>Region : ${data1[i].region}</p>
                                <p>SubRegion : ${data1[i].subregion}</p>
                                <p>CountryCode : ${data1[i].countrtycode}</p>
                                <p>Population : ${data1[i].population}</p>
                                <p>Latitude : ${data1[i].lat}</p>
                                <p>Longitude : ${data1[i].lng}</p>`;

            let btn = document.createElement("button");
            btn.setAttribute("class", "btn btn-primary");
            btn.setAttribute("onclick", `handleWeatherButtonClick(${data1[i].lat}, ${data1[i].lng}, this.nextElementSibling)`);
            btn.innerText = "Click for Weather";

            let weather = document.createElement("div");
            weather.setAttribute("class", "weather-container");

            card.append(cardheader);
            card.append(cardbody);
            cardbody.append(img, cardtext, btn, weather);
            column.appendChild(card);
            row.appendChild(column);
        }

        container.append(h1, row);
        document.body.append(container);
    });

function fetchWeather(lat, lng) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=9b3abd72af5e8ee4c215adb53b59b0e5`)
        .then(response => response.json());
}

const handleWeatherButtonClick = (lat, lng, weatherContainer) => {
    fetchWeather(lat, lng)
        .then((weatherInfo) => {
            weatherContainer.innerHTML = `<br>
                <h6>Weather: ${weatherInfo.weather[0].description}<img src="http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png" class="img-fluid"></h6>
            <h6>Temperature: ${weatherInfo.main.temp}</h6>`;
        });
};


