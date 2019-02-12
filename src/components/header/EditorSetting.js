import React from "react";
import PropTypes from "prop-types";

import { Col, Icon, Popover, Row, Switch, Radio } from "antd";

import styles from "./Header.module.css";

const EditorSettingButton = props => {
  return (
    <Popover
      content={
        <EditorSettingContent
          toggleScrollSync={props.toggleScrollSync}
          toggleDisplayMode={props.toggleDisplayMode}
        />
      }
      title="Editor Setting Controller"
      trigger={['click']}
    >
      <button className={styles.button}>
        <Icon type="setting" theme="outlined" title="Editor Setting"/>
      </button>
    </Popover>
  );
};

EditorSettingButton.propTypes = {
  toggleScrollSync: PropTypes.func.isRequired,
  toggleDisplayMode: PropTypes.func.isRequired
};

const EditorSettingContent = props => (
  <div className={styles.editorSettingContainer}>
    <Row className={styles.editorSettingItem} type="flex" justify="space-between" align="middle">
      <Col>
        Scroll-Sync
      </Col>
      <Col>
        <Switch defaultChecked onChange={props.toggleScrollSync} />
      </Col>
    </Row>
    <Row
      className={styles.editorSettingItem}
      type="flex"
      justify="space-between"
      align="middle"
      gutter={16}
    >
      <Col>
        Display Mode
      </Col>
      <Col>
        <Radio.Group
          onChange={props.toggleDisplayMode}
          defaultValue="Editor & Preview"
          buttonStyle="solid" size='small'
        >
          <Radio.Button value="Editor Only">Editor</Radio.Button>
          <Radio.Button value="Editor & Preview">Both</Radio.Button>
          <Radio.Button value="Preview Only">Preview</Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  </div>
);

EditorSettingContent.propTypes = {
  toggleScrollSync: PropTypes.func.isRequired,
  toggleDisplayMode: PropTypes.func.isRequired
};

export { EditorSettingButton };