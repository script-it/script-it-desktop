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
      currentElementType: ScreenplayElementTypes.action,
      editorState: EditorState.createEmpty(),
      filename: props.filename
    };

    this.changeElementType = this.changeElementType.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.onChange = this.handleChange.bind(this);
    this.setCurrentBlockType = this.setCurrentBlockType.bind(this);
  }
  
  componentDidMount() {
    this.setCurrentBlockType(this.state.currentElementType);
  }

  handleChange(editorState) {
    this.setState({ editorState });
  }
  
  handleKeyCommand(command) {
    return 'not-handled';
  }

  handleTab(event) {
    event.preventDefault();
    this.changeElementType();
  }

  changeElementType() {
    const currentElementType = RichUtils.getCurrentBlockType(this.state.editorState);
    const nextElementType = NextScreenplayElement(currentElementType);
    this.setState({currentElementType: nextElementType}, () => {
      this.setCurrentBlockType(nextElementType);
    });
  }
  
  setCurrentBlockType(type) {
    this.setState({
      editorState: RichUtils.toggleBlockType(this.state.editorState, type)
    });
  }

  blockStyleFn(contentBlock) {
    return contentBlock.getType();
  }

  renderToolbar() {
    return (
      <div className="toolbar">
        <div>
          {this.state.currentElementType}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderToolbar()}
        <Editor
          blockStyleFn={this.blockStyleFn}
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={keyBindingFn}
          onChange={this.onChange}
          onTab={this.handleTab}
        />
      </div>
    );
  }
}

export default App;
