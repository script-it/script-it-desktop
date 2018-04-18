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
    this.logFountain = this.logFountain.bind(this);
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

  logFountain() {
    // this.state.editorState.getCurrentContent().getBlocksAsArray()
    //
    // this will get the blocks in order, then it will be the job of an adapter
    // to iterate through the blocks and create a line of fountain text for each
    // block based on its type and text content.
    console.log(this.state.editorState.getCurrentContent().getPlainText());
    // ^^^ this is not detailed enough.
  }

  // we also need a handle return to set the block type to the next logical type
  // character -> dialogue, dialogue -> character, parenthetical -> dialog
  //
  // we also have to auto detect 'INT', 'EXT' and '()'. Maybe everything that
  // doesn't come after a character or dialog or parenthetical will automatically
  // be inserted as an action. then they can be manually changed with <tab> or
  // will automatically be changed when special character's are detected in the
  // proper locations.

  renderToolbar() {
    return (
      <div className="toolbar">
        <div>
          {this.state.currentElementType}
        </div>
        <button onClick={this.logFountain}>Log Fountain</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderToolbar()}
        <div className="screenplay-editor">
          <Editor
            blockStyleFn={this.blockStyleFn}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={keyBindingFn}
            onChange={this.onChange}
            onTab={this.handleTab}
          />
        </div>
      </div>
    );
  }
}

export default App;
