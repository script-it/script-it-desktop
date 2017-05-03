import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fs from 'fs'

class App extends Component {
  render() {
    return (
      <h1>{this.props.fileToOpen}</h1>
    )
  }
}

App.propTypes = {
  fileToOpen: PropTypes.string
}

export default App
