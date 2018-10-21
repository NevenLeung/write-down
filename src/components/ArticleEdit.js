import React, { Component } from "react";
import PropTypes from 'prop-types';

import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import {Row, Col, Radio} from 'antd';

import MarkdownParser from './MarkdownParser';
import Editor from './Editor';

import 'github-markdown-css';
import 'highlight.js/styles/github.css';

import styles from './ArticleEdit.module.css';

import markdownFeatureSrc from '../assets/markdown-test-file';
// import markdownCheatSheet from '../assets/markdown-cheatsheet';

class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: markdownFeatureSrc,
      displayMode: 'Editor & Previewer',
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

  handleModeChange = (e) => {
    const displayMode = e.target.value;

    this.setState({
      displayMode
    });
  };

  toggleStyleOfEditor (currentMode) {
    switch (currentMode) {
      case 'Editor Only':
        return styles.editorOnly;
      case 'Previewer Only':
        return styles.editorHide;
      default:
        return styles.editor;
    }
  }

  toggleStyleOfPreviewer (currentMode) {
    switch (currentMode) {
      case 'Editor Only':
        return styles.previewerHide;
      case 'Previewer Only':
        return styles.previewerOnly;
      default:
        return styles.previewer;
    }
  }

  render() {
    let renderResult = {
      __html: MarkdownParser.render(this.state.src)
    };

    return (
      <div>
        <Row className={styles.toolBar} type="flex" justify="center" align="middle">
          <ToolBar changeMode={this.handleModeChange}/>
        </Row>
        <ScrollSync>
          <Row className={styles.articleEditWrapper} type="flex" justify="center">
            <ScrollSyncPane>
              <Col className={this.toggleStyleOfEditor(this.state.displayMode)}>
                <Editor
                  value={this.state.src}
                  options={this.state.codeMirrorOption}
                  handleUpdate={this.handleSourceUpdate}
                />
              </Col>
            </ScrollSyncPane>

            <ScrollSyncPane>
              <Col className={this.toggleStyleOfPreviewer(this.state.displayMode)}>
                <Previewer renderResult={renderResult}/>
              </Col>
            </ScrollSyncPane>
          </Row>
        </ScrollSync>
      </div>
    );
  }
}

function Previewer(props) {
  return (
    <div className='markdown-body' dangerouslySetInnerHTML={props.renderResult}/>
  )
}

Previewer.propTypes = {
  renderResult: PropTypes.object
};

function ToolBar(props) {
  return (
    <>
      <Col>
        <DisplayMode changeDisplayMode={props.changeMode}/>
      </Col>
    </>
  )
}

ToolBar.propTypes = {
  changeMode: PropTypes.func.required
};

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function DisplayMode(props) {
  return (
    <div>
      <RadioGroup onChange={props.changeDisplayMode} defaultValue="Editor & Previewer" buttonStyle="solid">
        <RadioButton value="Editor Only">Editor Only</RadioButton>
        <RadioButton value="Editor & Previewer">Editor & Previewer</RadioButton>
        <RadioButton value="Previewer Only">Previewer Only</RadioButton>
      </RadioGroup>
    </div>
  )
}

DisplayMode.propTypes = {
  changeDisplayMode: PropTypes.func.required
};

export default ArticleEdit;
