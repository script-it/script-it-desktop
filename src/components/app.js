import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fs from 'fs'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  componentDidMount() {
    if (this.props.fileToOpen) {
      fs.readFile(this.props.fileToOpen, 'utf8', (err, data) => {
        this.setState({ data });
      })
    }
  }

  render() {
    return (
      <div>{this.state.data}</div>
    )
  }
}

App.propTypes = {
  fileToOpen: PropTypes.string
}

export default App
