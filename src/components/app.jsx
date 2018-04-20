import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import * as FormatUtils from '../utils/screenplay-format-utils';
import FormatToFountain from '../utils/format-to-fountain';
import keyBindingFn from '../utils/key-bindings';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentElementType: FormatUtils.ElementTypes.action,
      editorState: EditorState.createEmpty(),
      filename: props.filename
    };

    this.changeElementType = this.changeElementType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.logFountain = this.logFountain.bind(this);
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

  handleReturn() {
    const currentType = RichUtils.getCurrentBlockType(this.state.editorState);
    const nextType = FormatUtils.NextInReturnSequence(currentType);
    this.changeElementType(nextType);
  }

  handleTab(event) {
    event.preventDefault();
    const currentType = RichUtils.getCurrentBlockType(this.state.editorState);
    const nextType = FormatUtils.NextInTabSequence(currentType);
    this.changeElementType(nextType);
  }

  changeElementType(type) {
    this.setState({currentElementType: type}, () => {
      this.setCurrentBlockType(type);
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
    let fountainString = '';
    const contentBlocks = this.state.editorState.getCurrentContent().getBlocksAsArray();

    contentBlocks.forEach((contentBlock) => {
      const line = FormatToFountain(contentBlock.type, contentBlock.text);
      fountainString += `${line}\n`;
    });

    console.log(fountainString);
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
            handleReturn={this.handleReturn}
            keyBindingFn={keyBindingFn}
            onChange={this.handleChange}
            onTab={this.handleTab}
          />
        </div>
      </div>
    );
  }
}

export default App;
