import React, { Component } from 'react'
import ShowLocalWeather from './show-local-weather'
import Header from './header'
import Footer from './footer'
import { Grid, Row, Col } from 'react-bootstrap'

class App extends Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <ShowLocalWeather />
          </Col>
        </Row>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
