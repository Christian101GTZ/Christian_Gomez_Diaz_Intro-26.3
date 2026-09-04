const locationButton =
    document.querySelector("#location-button");

const forecastButton =
    document.querySelector("#forecast-button");

const historyButton =
    document.querySelector("#history-button");

const locationStatus =
    document.querySelector("#location-status");

const results =
    document.querySelector("#results");


let latitude;
let longitude;


// Get user's location
locationButton.addEventListener("click", getUserLocation);


function getUserLocation() {

    if (!navigator.geolocation) {

        locationStatus.innerText =
            "Your browser does not support location services.";

        return;
    }


    locationStatus.innerText =
        "Requesting your location...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            latitude =
                position.coords.latitude;

            longitude =
                position.coords.longitude;


            locationStatus.innerText =
                "Location ready.";


            forecastButton.disabled = false;
            historyButton.disabled = false;
        },


        function() {

            locationStatus.innerText =
                "Unable to access your location.";


            forecastButton.disabled = true;
            historyButton.disabled = true;
        }
    );
}


// 7-Day Forecast
forecastButton.addEventListener(
    "click",
    getForecast
);


async function getForecast() {

    const url =
        "https://api.open-meteo.com/v1/forecast" +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
        "&temperature_unit=fahrenheit" +
        "&timezone=auto" +
        "&forecast_days=7";


    results.innerHTML = `
        <h2>7-Day Forecast</h2>
        <p>Loading weather data...</p>
    `;


    try {

        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Unable to load forecast."
            );
        }


        const data =
            await response.json();


        displayForecast(data);


    } catch (error) {

        results.innerHTML = `
            <h2>Error</h2>

            <p>
                Weather data could not be loaded.
            </p>
        `;


        console.log(error);
    }
}


// Display forecast
function displayForecast(data) {

    results.innerHTML = `
        <h2>7-Day Forecast</h2>

        <p>
            Upcoming weather for your current location.
        </p>

        <div id="weather-list"></div>
    `;


    const weatherList =
        document.querySelector("#weather-list");


    for (
        let i = 0;
        i < data.daily.time.length;
        i++
    ) {

        const weatherCard =
            document.createElement("div");


        weatherCard.classList.add(
            "weather-card"
        );


        weatherCard.innerHTML = `

            <h3>
                ${formatDisplayDate(
                    data.daily.time[i]
                )}
            </h3>


            <p>
                Condition:
                ${getWeatherDescription(
                    data.daily.weather_code[i]
                )}
            </p>


            <p>
                High:
                ${Math.round(
                    data.daily
                        .temperature_2m_max[i]
                )}°F
            </p>


            <p>
                Low:
                ${Math.round(
                    data.daily
                        .temperature_2m_min[i]
                )}°F
            </p>


            <p>
                Rain Chance:
                ${
                    data.daily
                        .precipitation_probability_max[i]
                }%
            </p>
        `;


        weatherList.appendChild(
            weatherCard
        );
    }
}


// Weather History
historyButton.addEventListener(
    "click",
    getWeatherHistory
);


async function getWeatherHistory() {

    const dates =
        getLastYearDates();


    const url =
        "https://archive-api.open-meteo.com/v1/archive" +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&start_date=${dates.start}` +
        `&end_date=${dates.end}` +
        "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum" +
        "&temperature_unit=fahrenheit" +
        "&precipitation_unit=inch" +
        "&timezone=auto";


    results.innerHTML = `
        <h2>Weather History</h2>

        <p>
            Loading historical weather...
        </p>
    `;


    try {

        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Unable to load weather history."
            );
        }


        const data =
            await response.json();


        displayHistory(data);


    } catch (error) {

        results.innerHTML = `
            <h2>Error</h2>

            <p>
                Historical weather could not be loaded.
            </p>
        `;


        console.log(error);
    }
}


// Display historical weather
function displayHistory(data) {

    results.innerHTML = `
        <h2>Weather History</h2>

        <p>
            Weather from the same
            7-day period one year ago.
        </p>

        <div id="weather-list"></div>
    `;


    const weatherList =
        document.querySelector("#weather-list");


    for (
        let i = 0;
        i < data.daily.time.length;
        i++
    ) {

        const weatherCard =
            document.createElement("div");


        weatherCard.classList.add(
            "weather-card"
        );


        weatherCard.innerHTML = `

            <h3>
                ${formatDisplayDate(
                    data.daily.time[i]
                )}
            </h3>


            <p>
                Condition:
                ${getWeatherDescription(
                    data.daily.weather_code[i]
                )}
            </p>


            <p>
                High:
                ${Math.round(
                    data.daily
                        .temperature_2m_max[i]
                )}°F
            </p>


            <p>
                Low:
                ${Math.round(
                    data.daily
                        .temperature_2m_min[i]
                )}°F
            </p>


            <p>
                Precipitation:
                ${
                    data.daily
                        .precipitation_sum[i]
                } inches
            </p>
        `;


        weatherList.appendChild(
            weatherCard
        );
    }
}


// Get same 7-day period from last year
function getLastYearDates() {

    const today =
        new Date();


    const startDate =
        new Date(
            today.getFullYear() - 1,
            today.getMonth(),
            today.getDate()
        );


    const endDate =
        new Date(startDate);


    endDate.setDate(
        startDate.getDate() + 6
    );


    return {

        start:
            formatApiDate(startDate),

        end:
            formatApiDate(endDate)
    };
}


// Format date for the API
function formatApiDate(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;
}


// Format date for display
function formatDisplayDate(dateString) {

    const date =
        new Date(
            `${dateString}T12:00:00`
        );


    return date.toLocaleDateString(

        undefined,

        {
            weekday: "long",
            month: "short",
            day: "numeric"
        }
    );
}


// Convert weather codes into readable words
function getWeatherDescription(code) {

    const weatherCodes = {

        0: "Clear Sky",

        1: "Mainly Clear",

        2: "Partly Cloudy",

        3: "Overcast",

        45: "Fog",

        48: "Fog",

        51: "Light Drizzle",

        53: "Drizzle",

        55: "Heavy Drizzle",

        61: "Light Rain",

        63: "Rain",

        65: "Heavy Rain",

        71: "Light Snow",

        73: "Snow",

        75: "Heavy Snow",

        80: "Rain Showers",

        81: "Rain Showers",

        82: "Heavy Rain Showers",

        95: "Thunderstorm",

        96: "Thunderstorm with Hail",

        99: "Severe Thunderstorm with Hail"
    };


    return (
        weatherCodes[code] ||
        "Unknown Conditions"
    );
}