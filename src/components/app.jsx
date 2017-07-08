import { ipcRenderer } from 'electron';
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
    this.state = {
      editorState: EditorState.createEmpty(),
      filename: props.filename
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.onChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    if (this.state.filename) {
      fs.readFile(this.state.filename, 'utf8', (err, data) => {
        if (err) throw err;
        this.loadFileData(data);
      });
    }

    ipcRenderer.on('save-file', () => {
      if (this.state.filename) {
        this.saveFile();
      } else { 
        this.saveFileAs();
      }
    });

    ipcRenderer.on('save-file-as', (event, props) => {
      let filename = props.filename
      if (filename) {
        if (!this.state.filename) {
          this.setState({ filename }, () => {
            this.saveFile();
            ipcRenderer.send('update-window-title', { title: filename });
          })
        } else {
          this.saveFile();
        }
      }
    });
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
      if (this.state.filename) {
        this.saveFile();
      } else {
        this.saveFileAs();
      }
      return 'handled';
    }
    if (command === 'save-file-as') {
      this.saveFileAs();
      return 'handled';
    }
    return 'not-handled';
  }

  saveFile() {
    let contentString = this.state.editorState.getCurrentContent().getPlainText();
    fs.writeFile(this.state.filename, contentString, (err) => {
      if (err) throw err;
    });
  }

  saveFileAs() {
    ipcRenderer.send('open-save-dialog');
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
  filename: PropTypes.string,
};

App.defualtProps = {
  filename: "",
};

export default App;
