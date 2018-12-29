import React, { Component } from "react";
import { Dropdown, Icon, Menu } from "antd";

import { exportFile, generateStyledHTML } from "../../utils";

import styles from "./Header.module.css";

class MoreMenuInEditPage extends Component {
  handleMenuItemClick= ({item, key, keyPath}) => {
    if (key === 'markdown') {
      exportFile(this.props.markdown, 'text/markdown; charset=utf-8', this.props.title + '.md');
    } else if (key === 'html') {
      const file = generateStyledHTML(this.props.title, this.props.html);

      exportFile(file, 'text/plain; charset=utf-8', this.props.title + '.html');
    }
  };

  render() {
    return (
      // {...this.props} 是为了让Menu组件正确地获取到作为overlay的样式属性,
      // 这一点并没有在官方文档中有所说明，但在issue中找到这个解决方法
      <Menu {...this.props} onClick={this.handleMenuItemClick}>
        <Menu.Item key="markdown">
          Export as Markdown
        </Menu.Item>
        <Menu.Item key="html">
          Export as HTML
        </Menu.Item>
        <Menu.Item key="3">
          Help
        </Menu.Item>
      </Menu>
    );
  }
}

const MoreButtonInEditPage = ({title, markdown, htmlOutput}) => {
  return (
    <Dropdown
      className={styles.button}
      overlay={
        <MoreMenuInEditPage
          title={title}
          markdown={markdown}
          html={htmlOutput}
        />
      }
      trigger={['click']}
      placement='bottomCenter'
    >
      <Icon type="ellipsis" theme="outlined" />
    </Dropdown>
  );
};

export {
  MoreMenuInEditPage
};