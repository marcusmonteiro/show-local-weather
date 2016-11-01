import React from 'react'
import degreesToDirection from 'degrees-to-direction'
import { Grid, Row, Col, Image } from 'react-bootstrap'

import s from './styles.css'

export default function ShowLocalWeather ({localWeather}) {
  let tempUnit
  let windSpeedUnit

  switch (localWeather.unitSystem) {
    case 'metric':
      tempUnit = <strong>&deg;C</strong>
      windSpeedUnit = <strong>m/s</strong>
      break
    case 'imperial':
      tempUnit = <strong>&deg;F</strong>
      windSpeedUnit = <strong>mph/h</strong>
      break
    default:
      throw Error(`Invalid unit system: ${localWeather.unitSystem}`)
  }

  let Humidity
  let Temp
  let Wind

  if (localWeather.humidity) {
    Humidity = (
      <Row>
        <Col><p><i className='fa fa-tint' aria-hidden='true'></i> Humidity: {localWeather.humidity}%</p></Col>
      </Row>
    )
  }

  if (localWeather.temp) {
    Temp = (
      <Row>
        <Col><p><i className='fa fa-thermometer-full' aria-hidden='true'></i> Temperature: {localWeather.temp}{tempUnit}</p></Col>
      </Row>
    )
  }

  if (localWeather.wind_speed) {
    Wind = (
      <div>
        <Row>
          <Col><p><i className='fa fa-leaf' aria-hidden='true'></i> Wind speed: {localWeather.wind_speed}{windSpeedUnit}</p></Col>
        </Row>
        <Row>
          <Col><p><i className='fa fa-arrows' aria-hidden='true'></i> Wind direction: <strong>{degreesToDirection(localWeather.wind_degrees)}</strong></p></Col>
        </Row>
      </div>
    )
  }

  const iconLink = `http://openweathermap.org/img/w/${localWeather.icon}.png`

  return (
    <div style={s}>
      <div className='show-local-weather'>
      <Grid className='show-local-weather-center'>
        <Row>
          <Col><h4>Weather near <strong>{localWeather.location}</strong>:</h4></Col>
        </Row>
        <Row>
          <Col><p><Image src={iconLink} responsive /></p></Col>
          <Col><p>{localWeather.description}</p></Col>
        </Row>
        {Humidity}
        {Temp}
        {Wind}
      </Grid>
      </div>
    </div>
  )
}

ShowLocalWeather.propTypes = {
  localWeather: React.PropTypes.shape({
    unitSystem: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    humidity: React.PropTypes.number,
    temp: React.PropTypes.number,
    wind_speed: React.PropTypes.number,
    wind_degrees: React.PropTypes.number
  })
}
