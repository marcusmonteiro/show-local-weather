import React, {Component} from 'react'
import $ from 'jquery'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { head, tail, concat } from 'lodash'

import ShowLocalWeather from '../components'

export default class ShowLocalWeatherContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      localWeather: {},
      unitSystems: ['metric', 'imperial']
    }
    this.fetchLocalWeather = this.fetchLocalWeather.bind(this)
    this.changeUnitSystem = this.changeUnitSystem.bind(this)
  }

  componentDidMount () {
    this.fetchLocalWeather()
  }
  fetchLocalWeather () {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const API_KEY = '059967bffbcb3754f1b43fdcb2cddb05'
      const unitSystem = this.state.unitSystems[0]
      const apiUri = `http://api.openweathermap.org/data/2.5/weather?units=${unitSystem}&lat=${lat}&lon=${lon}&appid=${API_KEY}`
      $.getJSON(apiUri)
        .done((data) => {
          const localWeather = {
            unitSystem: unitSystem,
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

  changeUnitSystem() {
    this.setState({
      unitSystems: concat(tail(this.state.unitSystems), head(this.state.unitSystems))
    })
    this.fetchLocalWeather()
  }

  render () {
    if (!Object.keys(this.state.localWeather).length > 0) {
      return <p>Loading...</p>
    }
    return (
      <Grid>
        <Row>
          <Col><ShowLocalWeather localWeather={this.state.localWeather} /></Col>
        </Row>
        <Row>
          <Col xsOffset={3} mdOffSet={3} smOffSet={3}><p><Button bsStyle='primary' onClick={this.changeUnitSystem}>Current system: {this.state.unitSystems[0]}</Button></p></Col>
        </Row>
      </Grid>
    )
  }
}
