import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ContentState,
  Editor,
  EditorState,
} from 'draft-js';
import keyBindingFn from '../utils/key-bindings';
import fs from 'fs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    if (this.props.fileToOpen) {
      fs.readFile(this.props.fileToOpen, 'utf8', (err, data) => {
        if (err) throw err;
        this.loadFileData(data);
      });
    }
  }

  loadFileData(data) {
    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromText(data),
      ),
    });
  }

  handleChange(editorState) {
    this.setState({ editorState });
  }

  handleKeyCommand(command) {
    if (command === 'save-file') {
      this.saveFile();
      return 'handled';
    }
    return 'not-handled';
  }

  saveFile() {
    let contentString = this.state.editorState.getCurrentContent().getPlainText();
    fs.writeFile(this.props.fileToOpen, contentString, (err) => {
      if (err) throw err;
    });
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        keyBindingFn={keyBindingFn}
        onChange={this.onChange}
      />
    );
  }
}

App.propTypes = {
  fileToOpen: PropTypes.string,
};

App.defualtProps = {
  fileToOpen: "",
};

export default App;
