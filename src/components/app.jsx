import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState } from 'draft-js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = this.handleChange.bind(this);
  }

  handleChange(editorState) {
    this.setState({ editorState }, this.saveFile);
  }

  saveFile() {
    let contentString = this.state.editorState.getCurrentContent().getPlainText();
    console.log(contentString);
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
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
