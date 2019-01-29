import React from "react";
import { Modal } from "antd";

import LoginFormContainer from '../../containers/LoginFormContainer';

import styles from './Login.module.css';

class LoginModal extends React.Component {
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
        <button
          className={styles.loginButton}
          onClick={this.showModal}
        >
          Log in
        </button>
        <Modal
          width={400}
          title="User Login"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <LoginFormContainer
            closeModal={this.handleCancel}
          />
        </Modal>
      </div>
    );
  }
}

export { LoginModal };