import React from 'react';

import {Editor, EditorState, RichUtils} from 'draft-js';
import TableView from './TableView';

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
            <TableView tableHeader={tableData1.tableHeader} tableBody={tableData1.tableBody} ignore sortKey='' sortDir='' hover />
        </div>
    );
  }
}

export default MyEditor

var tableData = {
    tableHeader: ['Name', 'Age', 'Gender'],
    tableBody: [
        ['Ace', 28, 'Male'],
        ['Queen', 30, 'Female'],
        ['Boa', 23, 'Male'],
        ['Bob', 43, 'Male'],
        ['Boc', 12, 'Male'],
        ['Bod', 32, 'Male'],
        ['Boe', 22, 'Male'],
        ['Bog', 7, 'Male'],
        ['Bot', 53, 'Male'],
        ['Bou', 33, 'Male'],
        ['Boi', 13, 'Male'],
    ]
}

var tableData1 = {
    tableHeader: [
        [
            {id: 'name', name: 'Name', ifSort: false},
            {id: 'age', name: 'Age', ifSort: true},
            {id: 'gender', name: 'Gender', ifSort: false, dataFormat: fn2},
            {id: 'mark_rate', name: '得分率', ifSort: true, needCompare: true, dataFormat: fn1}
        ]
    ],
    tableBody: [
        {name: 'A', age: <a href='#'>Link</a>, gender: 'Male', mark_rate: 60},
        {name: 'B', age: 20, gender: 'Female', mark_rate: 70},
        {name: 'C', age: 30, gender: 'Male', mark_rate: 40},
        {gender: 'Male', age: 10, name: 'Jack', mark_rate: 50},
        {name: 'C', age: 40, gender: 'Male', mark_rate: 30},
        {name: 'C', age: 34, gender: 'Male', mark_rate: 80},
        {name: 'D', age: 50, gender: 'Female', mark_rate: 60}
    ]
}

function fn1(data) {
    return data + '.0%'
}

function fn2(data) {
    var suffix = {
        Male: ' +',
        Female: ' o'
    }
    return data + suffix[data]
}
