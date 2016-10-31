import React, {Component} from 'react'
import $ from 'jquery'

export default class ShowLocalWeatherContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      localWeather: {}
    }
    this.fetchLocalWeather = this.fetchLocalWeather.bind(this)
  }

  componentDidMount () {
    this.fetchLocalWeather()
  }
  fetchLocalWeather () {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const API_KEY = '059967bffbcb3754f1b43fdcb2cddb05'
      const apiUri = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      $.getJSON(apiUri)
        .done((data) => {
          const localWeather = {
            location: data.name,
            main_description: data.weather[0].main,
            secondary_description: data.weather[0].description,
            humidity: data.main.humidity,
            temp: data.main.temp,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
          }
          this.setState({
            localWeather
          })
        })
        .fail((err) => {
          console.error(err)
        })
    })
  }

  render () {
    return (
      <div>
        Hello, ShowLocalWeatherContainer!
      </div>
    )
  }
}
