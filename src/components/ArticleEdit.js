import React, { Component } from "react";
import PropTypes from 'prop-types';

import MarkdownParser from './MarkdownParser';

// import Editor from './Editor';
import { Controlled as CodeMirror } from "react-codemirror2";
import 'codemirror/mode/gfm/gfm.js';

import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
// import 'codemirror/theme/monokai.css';
// import 'codemirror/theme/mdn-like.css';
// import 'codemirror/theme/idea.css';
//
// // other theme
// import 'code-mirror-themes/themes/bespin.css';
// import 'code-mirror-themes/themes/rhuk.css';
// import 'code-mirror-themes/themes/emacs-strict.css';
// import 'code-mirror-themes/themes/fake.css';
// import 'code-mirror-themes/themes/monokai-fannonedition.css';
// import 'code-mirror-themes/themes/johnny.css';
// import 'code-mirror-themes/themes/friendship-bracelet.css';


import 'github-markdown-css';
import 'highlight.js/styles/docco.css';

import './theme/cherry.css';
import './ArticleEdit.css';

import markdownDemo from '../assets/markdown-test-file';

// let exampleText = `# Title
//
// [[TOC]]
//
// ## H2
//
// ### H3
//
// #### H4
//
// ![](https://images.unsplash.com/photo-1539192009878-8bb123d3244a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9d08ff19a5812ab5fb68bdbcb3908059&auto=format&fit=crop&w=400&q=80)
//
// [Google](https://www.google.com)
//
// - one
// - two
// - three
//
// - [ ] task1
// - [x] task2
//
// :memo:, :smile:
//
// \`\`\`javascript
// var name = {};
//
// function log() {
//   console.log('Log something');
// }
// \`\`\`
//
// __markdown-it__
//
// > this is a blockquote
//
// `;

class MarkdownPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: markdownDemo,
      option: {
        mode: 'gfm',
        theme: 'cherry',
        tabSize: 2
      }
    };
  }

  handleSourceUpdate = e => {
    const value = e.target.value;
    this.setState({
      src: value
    });
  };

  render() {
    // let md = new MarkdownIt();
    let renderResult = {
      __html: MarkdownParser.render(this.state.src)
    };

    return (
      <div className="edit-wrapper">
        <div className='editor'>
          {/*<EditPanel src={this.state.src} handleUpdate={this.handleContentUpdate}/>*/}
          <CodeMirror
            value={this.state.src}
            options={this.state.option}
            onBeforeChange={(editor, data, value) => {
              this.setState({ src: value });
            }}
            onChange={(editor, data, value) => {}}
          />

        </div>
        <div>
          {/*<div dangerouslySetInnerHTML={renderResult}/>*/}
          <DisplayPanel renderResult={renderResult}/>
        </div>
      </div>
    );
  }
}

function EditPanel(props) {
  return (
    <textarea name="" id="" cols="80" rows="30" value={props.src} onChange={props.handleUpdate}/>
  )
}

EditPanel.propTypes = {
  src: PropTypes.string,
  handleUpdate: PropTypes.func
};

function DisplayPanel(props) {
  return (
    <div className='markdown-body' dangerouslySetInnerHTML={props.renderResult}/>
  )
}

DisplayPanel.propTypes = {
  renderResult: PropTypes.object
};



export default MarkdownPanel;
