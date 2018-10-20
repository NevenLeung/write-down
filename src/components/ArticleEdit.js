import React, { Component } from "react";
import PropTypes from 'prop-types';

import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import {Row, Col, Switch} from 'antd';

import MarkdownParser from './MarkdownParser';
import Editor from './Editor';

import 'github-markdown-css';
import 'highlight.js/styles/github.css';

import './ArticleEdit.css';

import markdownFeatureSrc from '../assets/markdown-test-file';
// import markdownCheatSheet from '../assets/markdown-cheatsheet';

class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: markdownFeatureSrc,
      isEditModeOn: true,
      codeMirrorOption: {
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

  handleModeToggle = (checked) => {
    this.setState({
      isEditModeOn: checked
    });
  };

  render() {
    let renderResult = {
      __html: MarkdownParser.render(this.state.src)
    };

    return (
      <div>
        <Row>
          <ToolBar modeToggle={this.handleModeToggle}/>
        </Row>
        <ScrollSync>
          <Row className="edit-wrapper">
            <ScrollSyncPane>
              <Col className={this.state.isEditModeOn? 'editor edit-mode-is-on': 'editor edit-mode-is-off'}>
                <Editor
                  value={this.state.src}
                  options={this.state.codeMirrorOption}
                  handleUpdate={this.handleSourceUpdate}
                />
              </Col>
            </ScrollSyncPane>

            <ScrollSyncPane>
              <Col className={this.state.isEditModeOn? 'rendering': 'rendering read-mode-is-on'}>
                <RenderingPanel renderResult={renderResult}/>
              </Col>
            </ScrollSyncPane>
          </Row>
        </ScrollSync>
      </div>
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

function ToolBar(props) {
  return (
    <div className={'tool-bar'}>
      ToolBar
      <Switch defaultChecked checkedChildren={'Edit'} unCheckedChildren={'Read'} onChange={props.modeToggle}/>
    </div>
  )
}

ToolBar.propTypes = {
  modeToggle: PropTypes.func.required
};

export default ArticleEdit;
