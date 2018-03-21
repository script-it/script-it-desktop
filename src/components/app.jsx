import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import {
  ScreenplayElementTypes,
  NextScreenplayElement
} from '../utils/screenplay-element-map';
import keyBindingFn from '../utils/key-bindings';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      filename: props.filename
    };

    this.changeScreenplayElementType = this.changeScreenplayElementType.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.onChange = this.handleChange.bind(this);
    this.setCurrentBlockType = this.setCurrentBlockType.bind(this);
  }
  
  componentDidMount() {
    this.setCurrentBlockType(ScreenplayElementTypes.action);
  }

  handleChange(editorState) {
    this.setState({ editorState });
  }

  setCurrentBlockType(type) {
    this.setState({
      editorState: RichUtils.toggleBlockType(this.state.editorState, type)
    });
  }

  changeScreenplayElementType() {
    const currentElementType = RichUtils.getCurrentBlockType(this.state.editorState);
    const nextElementType = NextScreenplayElement(currentElementType);
    this.setCurrentBlockType(nextElementType);
  }

  handleKeyCommand(command) {
    return 'not-handled';
  }

  handleTab(event) {
    event.preventDefault();
    this.changeScreenplayElementType();
  }

  blockStyleFn(contentBlock) {
    return contentBlock.getType();
  }

  render() {
    return (
      <Editor
        blockStyleFn={this.blockStyleFn}
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        keyBindingFn={keyBindingFn}
        onChange={this.onChange}
        onTab={this.handleTab}
      />
    );
  }
}

export default App;
