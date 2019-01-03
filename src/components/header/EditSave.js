import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Button, Col, Popover, Row, Checkbox } from "antd";

import styles from './Header.module.css';

class EditPageSaveOption extends Component {
  state = {
    visible: false
  };

  hidePopover = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleSave = () => {
    const saveData = this.props.saveArticleContentToCurrentEdit;
    const data = this.props.markdown;

    saveData(data);
  };

  render() {
    return (
      <Popover
        content={
          <EditPageSaveOptionContent
            hidePopover={this.hidePopover}
            {...this.props}
          />
        }
        title="Please choose the place you want to save"
        trigger={["click"]}
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Button
          type="primary"
          htmlType="button"
          title="Just save the markdown and can be exported. It will not be abandoned unless there is another click on the option in the content of popover."
          onClick={this.handleSave}
        >
          Save
        </Button>
      </Popover>
    );
  }
}

class EditPageSaveOptionContent extends Component {
  state = {
    isRedirected: false
  };

  toggleCheckbox = () => {
    this.setState((state) => ({
      isRedirected: !state.isRedirected
    }));
  };

  clickOnDraft = () => {
    const { id, hidePopover, deleteArticle, saveArticleAsDraft } = this.props;

    saveArticleAsDraft(id);
    deleteArticle(id);

    hidePopover();
  };

  clickOnPublish = () => {
    const {
      id,
      hidePopover,
      publishArticle,
      deleteArticleFromDraft
    } = this.props;

    publishArticle(id);
    deleteArticleFromDraft(id);

    hidePopover();
  };

  render() {
    const PublishOption = this.state.isRedirected ? (
      <Col>
        <Link to="/articles">
          <button
            className={styles.publishButton}
            onClick={this.clickOnPublish}
            title="After publishing in article list, you can find it in article list page."
          >
            Ready to publish
          </button>
        </Link>
      </Col>
    ) : (
      <Col>
        <button
          className={styles.publishButton}
          onClick={this.clickOnPublish}
          title="After publishing in article list, you can find it in article list page."
        >
          Ready to publish
        </button>
      </Col>
    );

    const DraftOption = this.state.isRedirected ? (
      <Col>
        <Link to="/draft">
          <button
            className={styles.draftButton}
            onClick={this.clickOnDraft}
            title="After saving in draft list, you can find it in draft list page."
          >
            Save as draft
          </button>
        </Link>
      </Col>
    ) : (
      <Col>
        <button
          className={styles.draftButton}
          onClick={this.clickOnDraft}
          title="After saving in draft list, you can find it in draft list page."
        >
          Save as draft
        </button>
      </Col>
    );

    return (
      <div>
        <Row type="flex" justify="space-between" align="middle">
          {PublishOption}
          {DraftOption}
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col>
            <Checkbox value={this.state.isRedirected} onChange={this.toggleCheckbox}>
              Redirect to the relevant page later
            </Checkbox>
          </Col>
        </Row>
      </div>
    );
  }
}

EditPageSaveOptionContent.propsType = {
  hidePopover: PropTypes.func.isRequired
};

export { EditPageSaveOption };
