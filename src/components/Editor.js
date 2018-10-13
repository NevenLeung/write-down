import React, { Component } from "react";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/styles/hljs";

import { Controlled as CodeMirror } from "react-codemirror2";
import 'codemirror/mode/gfm/gfm.js';
import "codemirror/addon/selection/active-line";

import 'codemirror/lib/codemirror.css';
import './theme/cherry.css';
import PropTypes from "prop-types";

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

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        mode: 'gfm',
        theme: 'cherry',
        tabSize: 2,
        styleActiveLine: true,
        highlightFormatting: true
      }
    };
  }

  render() {

    return (
      <CodeMirror
        value={this.props.value}
        options={this.state.options}
        onBeforeChange={this.props.handleUpdate}
        onChange={(editor, data, value) => {}}
      />
    );
  }
}

Editor.propTypes = {
  value: PropTypes.string,
  handleUpdate: PropTypes.func
};

export default Editor;
