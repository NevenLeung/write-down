import React, { Component } from "react";
import PropTypes from 'prop-types';

import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import MarkdownParser from './MarkdownParser';
import Editor from './Editor';

import 'github-markdown-css';
import 'highlight.js/styles/github.css';

import './ArticleEdit.css';

import markdownFeatureSrc from '../assets/markdown-test-file';
// import markdownCheatSheet from '../assets/markdown-cheatsheet';

class MarkdownPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: markdownFeatureSrc,
      option: {
        mode: 'gfm',
        theme: 'cherry',
        tabSize: 2,
        styleActiveLine: true,
      }
    };
  }

  handleSourceUpdate = (editor, data, value) => {
    this.setState({
      src: value
    });
  };

  render() {
    let renderResult = {
      __html: MarkdownParser.render(this.state.src)
    };

    return (
      <ScrollSync>
        <div className="edit-wrapper">
          <ScrollSyncPane>
            <div className='editor'>
              <Editor
                value={this.state.src}
                options={this.state.option}
                handleUpdate={this.handleSourceUpdate}
              />
            </div>
          </ScrollSyncPane>

          <ScrollSyncPane>
            <div className='rendering'>
              <RenderingPanel renderResult={renderResult}/>
            </div>
          </ScrollSyncPane>
        </div>
      </ScrollSync>

    );
  }
}

function RenderingPanel(props) {
  return (
    <div className='markdown-body' dangerouslySetInnerHTML={props.renderResult}/>
  )
}

RenderingPanel.propTypes = {
  renderResult: PropTypes.object
};



export default MarkdownPanel;
