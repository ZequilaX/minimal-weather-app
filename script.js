window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature__container');
    let temperatureSpan = document.getElementById('temperature-span')
    let highTemp = document.querySelector('.high-temp-number');
    let lowTemp = document.querySelector('.low-temp-number');
    let labelOne = document.getElementById('label-one');
    let labelTwo = document.getElementById('label-two');
    let labelThree = document.getElementById('label-three');
    let labelFour = document.getElementById('label-four');
    let labelFive = document.getElementById('label-five');
    let dayCurrent = document.getElementById('day-current');
    let locationIcon = document.querySelector('.image__container');
    let windSpeed = document.getElementById('wind-speed');
    let windSymbol = document.getElementById('wind-symbol');
    let humidityPercent = document.getElementById('humidity');
    let rainPercent = document.getElementById('rain-percent');
    let rainPercentHourOne = document.getElementById('rain-percent-hour-one');
    let rainPercentHourTwo = document.getElementById('rain-percent-hour-two');
    let rainPercentHourThree = document.getElementById('rain-percent-hour-three');
    let rainPercentHourFour = document.getElementById('rain-percent-hour-four');
    let rainPercentHourFive = document.getElementById('rain-percent-hour-five');
    let tempHourOne = document.getElementById('current-hour-temp');
    let tempHourTwo = document.getElementById('two-hour-temp');
    let tempHourThree = document.getElementById('three-hour-temp');
    let tempHourFour = document.getElementById('four-hour-temp');
    let tempHourFive = document.getElementById('five-hour-temp');

    // FUNCTION TO ADD HOURS TO CURRENT TIME 
    function addHoursToDate(objDate, intHours) {
        var numberOfMlSeconds = today.getTime();
        var addMlSeconds = (intHours * 60) * 60 * 1000;
        var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

        return newDateObj;
    }

    // GETS DATE
    var today = new Date();

    // GET CURRENT DAY
    let dayListLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayListShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let currentDayNumber = [new Date().getDay()];
    let currentDay = dayListLong[currentDayNumber];
    dayCurrent.textContent = currentDay;

    //GETS CURRENT HOUR
    var currentHour = today.getHours();
    var currentHourAmPm = addHoursToDate(Date.now(), 0);
    const currentHourTime = currentHourAmPm.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true
    });
    labelOne.textContent = currentHourTime;


    // ONE HOUR AHEAD
    const oneHour = addHoursToDate(Date.now(), 1);
    const oneHourTime = oneHour.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true
    });
    labelTwo.textContent = oneHourTime;
    const arrayHourTwo = oneHour.getHours();

    // TWO HOURS AHEAD
    const twoHour = addHoursToDate(Date.now(), 2);
    const twoHourTime = twoHour.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true
    });
    labelThree.textContent = twoHourTime;
    const arrayHourThree = twoHour.getHours();

    // THREE HOURS AHEAD
    const threeHour = addHoursToDate(Date.now(), 3);
    const threeHourTime = threeHour.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true
    });
    labelFour.textContent = threeHourTime;
    const arrayHourFour = threeHour.getHours();

    // FOUR HOURS AHEAD
    const fourHour = addHoursToDate(Date.now(), 4);
    const fourHourTime = fourHour.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true
    });
    labelFive.textContent = fourHourTime;
    const arrayHourFive = fourHour.getHours();



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const forecastApi = `https://api.weatherapi.com/v1/forecast.json?key=9b86558a680a47f397e94529221106&q=${lat},${long}&aqi=no`;

            const currentApi = `https://api.weatherapi.com/v1/current.json?key=9b86558a680a47f397e94529221106&q=${lat},${long}&aqi=no`;

            fetch(currentApi)
            fetch(forecastApi)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {
                        temp_c
                    } = data.current;
                    const {
                        text
                    } = data.current.condition;
                    const {
                        name
                    } = data.location;
                    const {
                        maxtemp_c
                    } = data.forecast.forecastday[0].day;
                    const {
                        mintemp_c
                    } = data.forecast.forecastday[0].day;
                    const {
                        wind_kph
                    } = data.current;
                    const {
                        wind_mph
                    } = data.current;
                    const {
                        humidity
                    } = data.current;
                    const {
                        daily_chance_of_rain
                    } = data.forecast.forecastday[0].day;

                    // RAIN
                    const hourCurrentRainPercent = data.forecast.forecastday[0].hour[currentHour].chance_of_rain;

                    rainPercentHourOne.textContent = hourCurrentRainPercent;

                    //TEMP
                    const hourCurrentTemp = data.forecast.forecastday[0].hour[currentHour].temp_c;

                    tempHourOne.textContent = hourCurrentTemp;

                    // RAIN
                    const hourTwoRainPercent = data.forecast.forecastday[0].hour[arrayHourTwo].chance_of_rain;

                    rainPercentHourTwo.textContent = hourTwoRainPercent;

                    // TEMP
                    const hourTwoTemp = data.forecast.forecastday[0].hour[arrayHourTwo].temp_c;

                    tempHourTwo.textContent = hourTwoTemp;

                    // RAIN
                    const hourThreeRainPercent = data.forecast.forecastday[0].hour[arrayHourThree].chance_of_rain;

                    rainPercentHourThree.textContent = hourThreeRainPercent;

                    // TEMP 
                    const hourThreeTemp = data.forecast.forecastday[0].hour[arrayHourThree].temp_c;

                    tempHourThree.textContent = hourThreeTemp;

                    // RAIN
                    const hourFourRainPercent = data.forecast.forecastday[0].hour[arrayHourFour].chance_of_rain;

                    rainPercentHourFour.textContent = hourFourRainPercent;

                    // TEMP
                    const hourFourTemp = data.forecast.forecastday[0].hour[arrayHourFour].temp_c;

                    tempHourFour.textContent = hourFourTemp;

                    const hourFiveRainPercent = data.forecast.forecastday[0].hour[arrayHourFive].chance_of_rain;


                    const hourFiveTemp = data.forecast.forecastday[0].hour[arrayHourFive].temp_c;

                    tempHourFive.textContent = hourFiveTemp;

                    rainPercentHourFive.textContent = hourFiveRainPercent;

                    //const hourFiveRain = 14;






                    //Set DOM Elements from API
                    // TEMPERATURE
                    temperatureDegree.textContent = temp_c;
                    // TEMPERATURE DESCRIPTION
                    temperatureDescription.textContent = text;
                    // LOCATION NAME
                    temperatureTimezone.textContent = name;

                    // HUMIDITY 
                    humidityPercent.textContent = humidity;


                    // RAIN PERCENT
                    rainPercent.textContent = daily_chance_of_rain;

                    // WIND SPEED
                    windSpeed.textContent = wind_kph;

                    // HIGH AND LOW TEMPERATURE
                    highTemp.textContent = Math.round(maxtemp_c);
                    lowTemp.textContent = Math.round(mintemp_c);



                    //Formula
                    let farenheit = (temp_c * 1.8) + 32
                    let farenheitHigh = (maxtemp_c * 1.8) + 32
                    let farenheitLow = (mintemp_c * 1.8) + 32
                    let hourOneFarenheight = (hourCurrentTemp * 1.8) + 32
                    let hourTwoFarenheight = (hourTwoTemp * 1.8) + 32
                    let hourThreeFarenheight = (hourThreeTemp * 1.8) + 32
                    let hourFourFarenheight = (hourFourTemp * 1.8) + 32
                    let hourFiveFarenheight = (hourFiveTemp * 1.8) + 32

                    // Toggle temperature between Celcius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "°F") {
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = temp_c;
                            lowTemp.textContent = Math.round(mintemp_c);
                            highTemp.textContent = Math.round(maxtemp_c);
                            tempHourOne.textContent = hourCurrentTemp;
                            tempHourTwo.textContent = hourTwoTemp;
                            tempHourThree.textContent = hourThreeTemp;
                            tempHourFour.textContent = hourFourTemp;
                            tempHourFive.textContent = hourFiveTemp;
                            windSpeed.textContent = wind_kph;
                            windSymbol.textContent = "kph";
                        } else {
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = Math.round(Math.floor(farenheit));
                            lowTemp.textContent = Math.round(Math.floor(farenheitLow));
                            highTemp.textContent = Math.floor(farenheitHigh);
                            tempHourOne.textContent = Math.floor(hourOneFarenheight);
                            tempHourTwo.textContent = Math.floor(hourTwoFarenheight);
                            tempHourThree.textContent = Math.floor(hourThreeFarenheight);
                            tempHourFour.textContent = Math.floor(hourFourFarenheight);
                            tempHourFive.textContent = Math.floor(hourFiveFarenheight);
                            windSpeed.textContent = wind_mph;
                            windSymbol.textContent = "mph";
                        }
                    })

                });

            const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=19358775f1df01564a08e1f874b875cd`;


            fetch(weatherApi)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {
                        icon
                    } = data.weather[0];

                    locationIcon.innerHTML = `<img src="icons/${icon}.png"/>`;
                });

        });
    }
});