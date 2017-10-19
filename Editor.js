import React from 'react';

import {Editor, EditorState, RichUtils} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onH1Click() {

  }

  render() {
    return (
        <div>
            <button onClick={this._onBoldClick.bind(this)}>Bold</button>
            <button onClick={this._onH1Click.bind(this)}>H1</button>
            <div style={{border: '1px solid #ccc', minHeight: '10em', padding: '1em'}}>
                <Editor editorState={this.state.editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand} />
            </div>
        </div>
    );
  }
}

export default MyEditor
