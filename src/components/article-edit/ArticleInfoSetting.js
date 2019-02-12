import React from "react";
import { Icon, Popover, Modal } from "antd";

import { InfoSettingPreviewContainer } from "../../containers/ArticleInfoSettingContainer";
import { InfoSettingFormContainer } from "../../containers/ArticleInfoSettingContainer";

import styles from "./ArticleInfoSetting.module.css";

const InfoSettingButton = props => {
  return (
    <Popover
      content={<InfoSettingPreviewContainer/>}
      title="Article Info Preview"
      trigger={['hover']}
      mouseEnterDelay={0.8}
      placement='bottom'
    >
      <button className={styles.button} onClick={props.onClick}>
        <Icon type="form" theme="outlined" />
      </button>
    </Popover>
  );
};

class ArticleInfoSettingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <InfoSettingButton
          onClick={this.showModal}
          title="Article Info Setting"
        />
        <Modal
          style={{top: 20}}
          width={880}
          title="Article Info Setting"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <InfoSettingFormContainer
            afterSubmit={this.handleCancel}
          />
        </Modal>
      </div>
    );
  }
}

export default ArticleInfoSettingModal;