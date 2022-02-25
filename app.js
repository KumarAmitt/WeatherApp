const KEY = 'fd11f0ef4fd00e82c7ac337444e21703';

const getCityName = () => {
  let city = document.querySelector("[name='city']").value;
  return city.trim().split(' ').join('%20');
}


const showWeatherInfo = (info) => {
  const main = document.querySelector('.main');

  const markup = `<div class="weather-info">
                    <div class="units">
                      <span class="metric">&deg;<span class="cf">C</span></span>
                    </div>
                    <div class="city">${info.city}, ${info.country}</div>
                    <div class="temp">
                      <img src="http://openweathermap.org/img/wn/${info.icon}@2x.png">
                      <span><span class="updt-temp">${info.temp}</span>&deg;<span class="cf">C</span> </span>
                    </div>
                    <div class="desc">${info.desc}</div>
                  </div>`;

  main.textContent = '';
  main.insertAdjacentHTML('afterbegin', markup);

  document.querySelector('.units').addEventListener('click', () => {
    const tempDiv = document.querySelector('.updt-temp');
    const temp = parseFloat(document.querySelector('.updt-temp').textContent);
    const cf = document.querySelectorAll('.cf');
    cf.forEach((e) => {
      e.textContent = e.textContent === 'F' ? 'C' : 'F';
    });

    tempDiv.textContent = cf[0].textContent === 'F' ? ((temp * 1.8) + 32).toFixed(2).toString() : ((temp - 32) * 0.5556).toFixed(2).toString();
  });
};



const getWeatherInfo = (city) => {
  const weatherInfo = {};

  $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`, function (data, status) {
    weatherInfo.city = data.name;
    weatherInfo.country = data.sys.country;
    weatherInfo.temp = data.main.temp;
    weatherInfo.desc = data.weather[0].description;
    weatherInfo.icon = data.weather[0].icon;

    showWeatherInfo(weatherInfo);

  })

}


$(document).ready(function () {

  $('.form-submit').click((e) => {
    e.preventDefault();
    const city = getCityName();
    getWeatherInfo(city);
  })

})





