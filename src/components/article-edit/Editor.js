import React, { Component } from "react";

import { Controlled as CodeMirror } from "react-codemirror2";
import 'codemirror/mode/gfm/gfm.js';
import "codemirror/addon/selection/active-line"

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
        lineWrapping: true,
        // https://codemirror.net/doc/manual.html#option_viewportMargin

        // viewportMargin 是用于，设置初始渲染代码时在code mirror editor中显示代码的行数，
        // 它的默认值为10行，整个内容的显示区域的高度为300px，且无法通过其他的手段来修正它。
        // 如果不设置它，在初始渲染代码时，只会显示前10行，剩余的内容则需要点击一下editor才会显示出来，
        // 它也可以设置成Infinity，若初始的内容太多会导致一定的性能问题。
        // 我认为把它设置成比较大且够用的一个数值就可以，比如1000。
        viewportMargin: 1000
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
