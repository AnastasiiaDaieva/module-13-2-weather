import refs from './refs'
const { searchForm, widgetContainer, city, temp, icon, description, humidity, wind } = refs

let API_key = `b17a2dddb01d7481fea6373f92c2e546`
let cityName = 'Kyiv'

// Отрисовка данных с встраиванием значений в статическую разметку в html
searchForm.addEventListener('submit', e => {
  e.preventDefault()
  cityName = e.target.elements.search.value.trim()
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`
  cityName
    ? fetch(url)
        .then(r => r.json())
        .then(d => {
          console.log(d)
          localStorage.setItem('wetherData', JSON.stringify(d))
          renderWeatherData(d)
        })
    : alert(`введите данные`)
  searchForm.reset()
})
let weatherDataFromLS = JSON.parse(localStorage.getItem('wetherData'))
renderWeatherData(weatherDataFromLS)

function renderWeatherData(obj) {
  const {
    name,
    main: { temp: t, humidity: h },
    weather,
    wind: { speed },
  } = obj

  // удаляем класс loading, чтобы отобразить данные о погоде
  widgetContainer.classList.remove('loading')
  city.textContent = `Weather in ${name}`
  temp.textContent = `${Math.round(t - 273.15)}°C`
  icon.setAttribute('src', `https://openweathermap.org/img/wn/${weather[0].icon}.png`)
  icon.setAttribute('alt', weather[0].description)
  description.textContent = weather[0].description
  humidity.textContent = `Humidity: ${h}%`
  wind.textContent = `Wind speed: ${speed} km/h`
}
