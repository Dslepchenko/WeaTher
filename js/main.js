'use strict';
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);

const getRandomElementFromArr = (arr) => arr[getRandomInRange(0, arr.length - 1)];

const wrapper = document.querySelector('.wrapper');

const getData = () => fetch(`http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=25a3eddba3ab5c7c8a649e7c3e872b11`)
    .then(response => response.json())
    .then(data => data.list);

const createElement = (element, container) => {
    const template = document.createElement(`template`);
    template.innerHTML = element;
    container.appendChild(template.content);

};


const getCityTemplate = name => `<div class = "city-name">${name}</div>`
const getTempTemplate = main => `<div class="temp">${main.temp + `&deg`}</div>`
const getWeatherTemplate = weather => `<div class="isRaining">${weather[0].description}</div>`
const getIconWeatherTemplate = icon => `<img src="https://openweathermap.org/img/wn/02n@2x.png">`
// Это ссылка на png картинки погоды. Эту сслыку я нашел на том же сайте, где и API https://openweathermap.org/
//  в массиве, который получаем из fetch() есть код погоды data.weather[0].icon. Этот код из 3 символов.
// img src="https://openweathermap.org/img/wn/ вот он ---> 02n<----  @2x.png" . по скольку этот код мы получаем рандомом, значит его можно вставить в ссылку weather[0].icon вот так
//<img src="https://openweathermap.org/img/wn/${weather[0].icon}2x.png">` - но такая запись не работает, хотя console.log выводит значение randomObject(weather[0].icon) без всяких проблем)
// объясни почему так??? я уже часа 3 сижу над этим))



const elementTepmlate = (card) => `<div class = "wrapper">
    
        ${(getCityTemplate(card.name))}
        ${(getTempTemplate(card.main))}
       ${(getWeatherTemplate(card.weather))}
       ${(getIconWeatherTemplate(card.icon))}
     

    </div>`
   

const init = async() => {
    const data = await getData()
    let randomObject = getRandomElementFromArr(data);
    createElement(elementTepmlate(randomObject), wrapper);
}

init();

// 25a3eddba3ab5c7c8a649e7c3e872b11