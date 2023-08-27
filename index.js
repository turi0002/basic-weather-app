const element = document.getElementById("myInput");
const search = document.getElementById("search-box");
const city1 = document.getElementById("inputCity");
const today = document.getElementById("todayTime");
const icon = document.getElementById("weather-img");
const tomorrowWeather = document.getElementById("tempTomorrow");
const tomorrowCondition = document.getElementById("conditionTomorrow");
const tomorrowImg = document.getElementById("tomorrowImage");
const twoDaysWeather = document.getElementById("tempTwoDays");
const twoDaysCondition = document.getElementById("conditionTwoDays");
const twoDaysImg = document.getElementById("twoDaysImage");
const threeDaysWeather = document.getElementById("tempThreeDays");
const threeDaysCondition = document.getElementById("conditionThreeDays");
const threeDaysImg = document.getElementById("threeDaysImage");
const daysObj = [tomorrowWeather,tomorrowCondition,tomorrowImg,twoDaysWeather,twoDaysCondition, twoDaysImg, threeDaysWeather, threeDaysCondition, threeDaysImg]
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hour = date.getHours();
let minute = date.getMinutes();
let formatOfTemperature = "metric";
let evt = document.createEvent('HTMLEvents');
const temperatureShow = document.getElementById("tempratureNum");
const button = document.getElementById("btn");
const currentCity = 'london'

async function fetchWeather(city) {
    let defaultData = {
    }
    try {
        city
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${formatOfTemperature}&APPID=cc0606848d1ad036138ea63b1140dd2d`);
        data = await response.json();
        const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${formatOfTemperature}&appid=cc0606848d1ad036138ea63b1140dd2d`);
        futureData = await response2.json();
        console.log("success");
        const weatherData = {
            temperature: data.main.temp,
            condition: data.weather[0].main,
            location: data.name,
            icon: data.weather[0].icon,
            timeZone: data.timezone,
            futureTimeList: futureData.list 
          };
          return weatherData;
    }
       catch (error) {
        console.log("fail");
        alert("there is no such city")
        defaultData = fetchWeather("london")
      }
    
console.log(defaultData);
return defaultData;

}

window.addEventListener("load", async function () {
  if(minute<10)  {
    minute = "0"+ minute
  }
  const weatherAnswer = await fetchWeather(currentCity);
  city1.innerText = currentCity;
  temperatureShow.innerText = weatherAnswer.temperature.toFixed(1);
  icon.src = `assets/icons/${weatherAnswer.icon}.png`;
  today.innerText =
    day +
    "/" +
    month +
    "/" +
    year +
    ", " +
    (hour + weatherAnswer.timeZone / 60 / 60 - 3) +
    ":" +
    minute +
    " " +
    weatherAnswer.condition;
    for(let i=0; i<7; i=i+3) {
        daysObj[i].innerText = weatherAnswer.futureTimeList[i].main.temp.toFixed(1);
        daysObj[i+1].innerText = weatherAnswer.futureTimeList[i+1].weather[0].main;
        daysObj[i+2].src = `assets/icons/${weatherAnswer.futureTimeList[i+2].weather[0].icon}.png`;
}
console.log(weatherAnswer);
});



button.addEventListener("click", function (event){
    console.log("pls help me");
let inputValue = document.getElementsByClassName("location-input")[0].value;
console.log(formatOfTemperature);
if(formatOfTemperature === "metric"){
    formatOfTemperature = "imperial"
    handleMyInput("enter")
    if(inputValue !== undefined){
        handleMyInput("enter")
}
else{
    handleMyInput("enter")

}
}

else if(formatOfTemperature === "imperial"){
    formatOfTemperature = "metric"
    if(inputValue !== undefined){
        handleMyInput("enter")
    }
    
else{
handleMyInput("enter")
}
}
})

   async function handleMyInput(event){
    let inputValue = document.getElementsByClassName("location-input")[0].value;
    city1.innerText = inputValue;
    const weatherAnswer = await fetchWeather(inputValue);
    temperatureShow.innerText = weatherAnswer.temperature.toFixed(1);
    icon.src = `assets/icons/${weatherAnswer.icon}.png`;
    for(let i=0; i<7; i=i+3) {
        daysObj[i].innerText = weatherAnswer.futureTimeList[i].main.temp.toFixed(1);
        daysObj[i+1].innerText = weatherAnswer.futureTimeList[i+1].weather[0].main;
        daysObj[i+2].src = `assets/icons/${weatherAnswer.futureTimeList[i+2].weather[0].icon}.png`;
}
    today.innerText =
      day +
      "/" +
      month +
      "/" +
      year +
      ", " +
      (hour + weatherAnswer.timeZone / 60 / 60 - 3) +
      ":" +
      minute +
      " " +
      weatherAnswer.condition;
    console.log(weatherAnswer);
    }; 

    myInput.addEventListener("keypress", async function (event) {
        if(event.code === "Enter"){
            handleMyInput("Enter");
           
        }
        
     })
