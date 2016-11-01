import React, {Component} from 'react'
import $ from 'jquery'

import ShowLocalWeather from '../components'

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
      const apiUri = `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`
      $.getJSON(apiUri)
        .done((data) => {
          console.log(data)
          const localWeather = {
            location: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            temp: data.main.temp,
            wind_speed: data.wind.speed,
            wind_degrees: data.wind.deg
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
    if (!Object.keys(this.state.localWeather).length > 0) {
      return <p>Loading...</p>
    }
    return (
      <div>
        <ShowLocalWeather localWeather={this.state.localWeather} />
      </div>
    )
  }
}
