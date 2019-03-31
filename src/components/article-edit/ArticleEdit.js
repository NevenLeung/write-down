import React, { Component } from "react";
import { Redirect, Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import {Row, Col } from 'antd';

import { delay } from "../../utils/index";
import { MarkdownParser, ScrollToTop } from '../../utils';
import Editor from './Editor';

import 'github-markdown-css';
import 'prism-themes/themes/prism-darcula.css';

import styles from './ArticleEdit.module.css';

import {EditPageHeader as Header} from '../header/TheHeader';
// import markdownFeatureSrc from '../../assets/markdown-test-file';
// import markdownCheatSheet from '../assets/markdown-cheatsheet';

class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      markdown: '',
      htmlOutput: '',
      // 由于displayMode和scrollSync需要用到前一次的状态，需要存放在state中
      displayMode: 'Editor & Preview',
      scrollSync: true
    };

    this.codeMirrorOption = {
      mode: 'gfm',
      theme: 'cherry',
      tabSize: 2,
      styleActiveLine: true,
      lineWiseCopyCut: true,
    };

    // 初始化相应的节点
    this.$editor = null;
    this.$preview = null;

    // 使用这个变量来保存对应switch的控制
    this.isScrollSyncEnabled = true;

    this.editorScrollDistance = 0;
    this.previewScrollDistance = 0;

    this.lastDisplayMode = 'Editor & Preview';
  }

  componentDidMount() {
    this.$editor = document.querySelector('.editor');
    this.$preview = document.querySelector('.preview');

    // Prevent the user who isn't logged in to the article editing page.
    if (this.props.isLoggedIn && typeof this.props.markdown === 'string') {
      // If user click the edit button to article editing page,
      // it should fetch the data from the state by the <articleID>.

      // However, if the user jump to the article editing page by input the url
      // directly with invalid <articleID>, due to the invalid markdown string,
      // it will throw an error by markdown parser.
      const { markdown } = this.props;

      this.setState({
        isLoggedIn: true,
        markdown: markdown,
        htmlOutput: MarkdownParser.render(markdown)
      });
    } else {
      // Set isLoggedIn to false. It will redirect to the article list page.
      this.setState({
        isLoggedIn: false
      });
    }
  }

  componentWillUnmount() {
    // destroy the dom node reference
    this.$editor = null;
    this.$preview = null;
  }

  handleSourceUpdate = (editor, data, value) => {
    this.setState({
      markdown: value,
      htmlOutput: MarkdownParser.render(value)
    });

    if (!this.props.isMarkdownTouch) {
      // Set state.currentEdit.isTouch to true only when isTouch is false.
      this.props.updateContentEditStatus();
    }
  };

  handleScrollSyncToggle = () => {
    // 更新switch控制的选项
    this.isScrollSyncEnabled = !this.isScrollSyncEnabled;

    this.setState({
      scrollSync: this.isScrollSyncEnabled
    });
  };

  handleDisplayModeChange = async (e) => {
    const nextDisplayMode = e.target.value;

    this.setState({
      displayMode: nextDisplayMode
    });

    // 仅在'Editor & Preview'使用默认的scroll-sync功能，其他display mode采用this.syncScrollManually()来完成scroll-sync
    if (nextDisplayMode === 'Editor & Preview') {
      // 如果scroll-sync是通过switch设置为关闭后，此时this.isScrollSyncEnabled为true，切换display mode不能开启它。
      // 只要在switch为开启状态下，即this.isScrollSyncEnabled时，切换回'Editor & Preview'才能开启它。
      if (this.isScrollSyncEnabled) {
        // 在页面还处于伸缩状态时，窗口的高度不定，scroll-sync会导致页面发生跳动
        // 添加一个延时来延迟scroll-sync的开启
        await delay(200);

        this.setState({
          scrollSync: true
        });
      }
    } else {
      // display mode切换至'Editor Only'或'Preview Only'，则要尽快地关闭scroll-sync，防止无效的同步
      this.setState({
        scrollSync: false
      });
    }

    this.syncScrollManually(this.isScrollSyncEnabled, this.lastDisplayMode, nextDisplayMode);

    // 保存前一次的display mode
    this.lastDisplayMode = nextDisplayMode;
  };

  saveScrollTop = () => {
    this.editorScrollDistance = this.$editor.scrollTop;
    this.previewScrollDistance = this.$preview.scrollTop;
  };

  syncScrollManually = async (isScrollSyncEnabled, prevDisplayMode, nextDisplayMode) => {
    // 如果switch控制的scroll-sync是关闭的，那不需要手动同步
    if (!isScrollSyncEnabled) {
      return;
    }

    // 根据滚动百分比计算对应的滚动距离
    if (prevDisplayMode === 'Editor Only' && nextDisplayMode === 'Preview Only') {
      // 基于editor，计算preview
      const scrollingProportion = this.getScrollingProportion(this.$editor);

      // 防止在切换display mode时，高度突变引起的scrollHeight出错
      await delay(200);
      this.$preview.scrollTop = this.getCalculatedScrollTop(this.$preview, scrollingProportion);
    }

    if (prevDisplayMode === 'Preview Only' && nextDisplayMode === 'Editor Only') {
      // 基于preview，计算editor
      const scrollingProportion = this.getScrollingProportion(this.$preview);

      // 防止在切换display mode时，高度突变引起的scrollHeight出错
      await delay(200);
      this.$editor.scrollTop = this.getCalculatedScrollTop(this.$editor, scrollingProportion);
    }


    // 根据切换至 "Editor & Preview" 之前的显示的内容的滚动距离来设定
    if (prevDisplayMode === 'Editor Only' && nextDisplayMode === 'Editor & Preview') {
      // 这里 +1 是为了稍微更新一下scrollTop，从而触发scroll sync组件的同步功能。
      // 如果不进行 +1，scrollTop与editorScrollDistance是相等的，不会触发scroll sync组件的同步功能
      this.$editor.scrollTop = this.editorScrollDistance - 1;
    }

    if (prevDisplayMode === 'Preview Only' && nextDisplayMode === 'Editor & Preview') {
      this.$preview.scrollTop = this.previewScrollDistance - 1;
    }
  };

  // 计算滚动距离所占的百分比
  getScrollingProportion(node) {
    if (node.matches('.editor')) {
      return (this.editorScrollDistance / (node.scrollHeight - node.clientHeight)).toFixed(4);
    }

    if (node.matches('.preview')) {
      return (this.previewScrollDistance / (node.scrollHeight - node.clientHeight)).toFixed(4);
    }
  }

  // 根据百分比计算出另一个窗口的滚动距离
  getCalculatedScrollTop(node, proportion) {
    return Math.round((node.scrollHeight - node.clientHeight) * proportion);
  }

  toggleStyleOfEditor (currentMode) {
    switch (currentMode) {
      case 'Editor Only':
        return styles.editorOnly;
      case 'Preview Only':
        return styles.editorHide;
      default:
        return styles.editor;
    }
  }

  toggleStyleOfPreviewer (currentMode) {
    switch (currentMode) {
      case 'Editor Only':
        return styles.previewHide;
      case 'Preview Only':
        return styles.previewOnly;
      default:
        return styles.preview;
    }
  }

  render() {
    const { isLoggedIn } = this.state;
    const { isMarkdownTouch } = this.props;

    return (
      <>
        {
          isLoggedIn
            ? (
              <div>
                <Prompt
                  when={isMarkdownTouch}
                  message="You haven't saved the markdown yet. Are you sure to abandon the changes?"
                />
                <ScrollToTop/>
                <Header
                  id={this.props.id}
                  markdown={this.state.markdown}
                  toggleDisplayMode={this.handleDisplayModeChange}
                  toggleScrollSync={this.handleScrollSyncToggle}
                />
                <ScrollSync enabled={this.state.scrollSync}>
                  <Row className={styles.articleEditWrapper} type="flex" justify="center">
                    <ScrollSyncPane>
                      <Col
                        className={this.toggleStyleOfEditor(this.state.displayMode) + ' editor'}
                        ref={this.editor}
                        onScroll={throttle(this.saveScrollTop, 200, {trailing: true})}
                      >
                        {/*<div className={styles.editorWrapper}>*/}
                        <Editor
                          value={this.state.markdown}
                          options={this.codeMirrorOption}
                          handleUpdate={this.handleSourceUpdate}
                        />
                        {/*</div>*/}
                      </Col>
                    </ScrollSyncPane>

                    <ScrollSyncPane>
                      <Col
                        className={this.toggleStyleOfPreviewer(this.state.displayMode) + ' preview'}
                        onScroll={throttle(this.saveScrollTop, 200, {trailing: true})}
                      >
                        {/*<div className={styles.previewWrapper}>*/}
                        <Preview renderResult={{
                          __html: this.state.htmlOutput
                        }}/>
                        {/*</div>*/}
                      </Col>
                    </ScrollSyncPane>
                  </Row>
                </ScrollSync>
              </div>
            ) : (
              <Redirect to='/articles'/>
            )
        }
      </>
    );
  }
}

class Preview extends Component {
  render() {
    return (
      <div className='markdown-body' dangerouslySetInnerHTML={this.props.renderResult}/>
    )
  }
}

Preview.propTypes = {
  renderResult: PropTypes.object
};

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }
//
//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }
//
//   componentDidCatch(error, info) {
//     console.log(error, info);
//   }
//
//   render() {
//     console.log(this.state);
//     if (this.state.hasError) {
//       return <h1>Something went wrong.</h1>
//     }
//
//     return this.props.children;
//   }
// }
//
// const ArticleEditWithErrorBoundary = (props) => (
//   <ErrorBoundary>
//     <ArticleEdit {...props}/>
//   </ErrorBoundary>
// );

export default ArticleEdit;
