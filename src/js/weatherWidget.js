import template from '../templates/template.handlebars'
import refs from './refs'
const {
  showBtn,
  hideBtn,
  templateContainer,
  searchForm,
  widgetContainer,
  city,
  temp,
  icon,
  humidity,
  wind,
  description,
} = refs
import axios from 'axios'
import { setErrorMsg } from './notification'

// console.log('axios', axios)

let BASE_URL = `https://api.openweathermap.org/data/2.5/weather`
axios.defaults.baseURL = BASE_URL
// console.log(axios.defaults.baseURL)

let API_KEY = `80b44b54653d16d98c9d058e221ada36`

class WeatherWidget {
  constructor(baseUrl, apiKey, formRef, searchInput, templateFunc, insertContainer) {
    this.formRef = formRef
    this.baseUrl = baseUrl
    this.apiKey = apiKey
    this._cityName = 'Kyiv'
    this.searchInput = searchInput
    this.templateFunc = templateFunc
    this.insertContainer = insertContainer
    this.isShowWidget = false
  }

  get cityName() {
    return this._cityName
  }

  set cityName(value) {
    return (this._cityName = value)
  }

  getSearchValue() {
    this.formRef.addEventListener('submit', this.handleSubmit)
  }
  handleSubmit = e => {
    e.preventDefault()
    //  //  вызов сеттера без _
    //  this.cityName = e.target.elements[this.searchInput].value
    let inputValue = e.target.elements[this.searchInput].value.trim()

    if (inputValue && inputValue !== this.cityName) {
      this.insertContainer.innerHTML = ''
      this.cityName = inputValue
      this.getFetch()
      this.formRef.reset()
    } else {
      setErrorMsg('Enter the City Name please!')
    }
  }

  async getFetch() {
    // async via axios
    let params = `?q=${this.cityName}&appid=${this.apiKey}`

    try {
      let r = await axios.get(params)
      // console.log(r.data)
      localStorage.setItem('weatherData', JSON.stringify(r.data))
      this.renderData(r.data)
    } catch (e) {
      console.log(e)
    }
    // async via fetch
    // let url = this.baseUrl + params
    // try {
    //   let r = await fetch(url)
    //   let d = await r.json()
    //     localStorage.setItem('weatherData', JSON.stringify(d))
    //     this.renderData(d)
    //   })
    //   .catch(err => console.log(err))
    // }

    // classic fetch
    // fetch(url)
    //   .then(r => r.json())
    //   .then(d => {
    //     //
    //     console.log(d)
    //     localStorage.setItem('weatherData', JSON.stringify(d))
    //     renderData(d)
    //   })
    //   .catch(e => console.log(e))
  }
  renderData(obj) {
    let markup = this.templateFunc(obj)
    this.insertContainer.insertAdjacentHTML('beforeend', markup)
  }
  showWidget() {
    // console.log('show', this.isShowWidget)
    if (this.isShowWidget) {
      return
    } else {
      this.insertContainer.style.display = 'block'
      let weatherDataFromLS = JSON.parse(localStorage.getItem('weatherData'))
      // console.log('weatherDataFromLS', weatherDataFromLS)
      this.renderData(weatherDataFromLS)
      this.getSearchValue()
      this.isShowWidget = true
    }
  }
  hideWidget() {
    // console.log(this.isShowWidget)
    if (this.isShowWidget) {
      this.formRef.removeEventListener('submit', this.handleSubmit)
      this.insertContainer.innerHTML = ''
      this.insertContainer.style.display = 'none'
      this.isShowWidget = false
    } else {
      return
    }
    widgetContainer
  }
}

const newWeatherWidget = new WeatherWidget(BASE_URL, API_KEY, searchForm, 'search', template, templateContainer)
// console.log(newWeatherWidget)
newWeatherWidget.showWidget()
showBtn.addEventListener('click', newWeatherWidget.showWidget.bind(newWeatherWidget))
hideBtn.addEventListener('click', newWeatherWidget.hideWidget.bind(newWeatherWidget))

// classicFetch
// searchForm.addEventListener('submit', e => {
//   e.preventDefault()
//   // access via id search
//   cityName = e.target.elements.search.value.trim()
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
//   cityName
//     ? fetch(url)
//         .then(r => r.json())
//         .then(d => {
//           console.log(d)
//           localStorage.setItem('weatherData', JSON.stringify(d))
//           renderWeatherData(d)
//         })
//     : alert('Insert data')
//   searchForm.reset()
// })

// let weatherDataFromLS = JSON.parse(localStorage.getItem('weatherData'))

// renderWeatherData(weatherDataFromLS)

// function renderWeatherData(obj) {
//   const {
//     name,
//     main: { temp: t, humidity: h },
//     weather,
//     wind: { speed },
//   } = obj
//   widgetContainer.classList.remove('loading')
//   city.textContent = `Weather in ${name}`
//   temp.textContent = `${Math.round(t - 273.15)}°C`
//   icon.setAttribute('src', `https://openweathermap.org/img/wn/${weather[0].icon}.png`)
//   icon.setAttribute('alt', weather[0].description)
//   description.textContent = weather[0].description
//   humidity.textContent = `Humidity: ${h}%`
//   wind.textContent = `Wind speed: ${speed}km/h`
// }
