import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Col, Popover, Row } from "antd";

class EditPageSaveOption extends Component {
  state = {
    visible: false
  };

  hidePopover = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = (visible) => {
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
            id={this.props.id}
            hidePopover={this.hidePopover}
            publishArticle={this.props.publishArticle}
            saveArticleAsDraft={this.props.saveArticleAsDraft}
          />
        }
        title='Please choose the place you want to save'
        trigger={['click']}
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Button
          type='primary'
          htmlType='button'
          title='Just save the markdown and can be exported. It will not be abandoned unless there is another click on the option in the content of popover.'
          onClick={this.handleSave}
        >
          Save
        </Button>
      </Popover>
    );
  }
}

const EditPageSaveOptionContent = ({id, hidePopover, saveArticleAsDraft, publishArticle}) => {
  const clickOnDraft = () => {
    saveArticleAsDraft(id);

    hidePopover();
  };

  const clickOnPublish = () => {
    publishArticle(id);

    hidePopover();
  };

  return (
    <div>
      <Row type="flex" justify="space-between" align="middle">
        <Col>
          <Button
            type='primary'
            htmlType='button'
            onClick={clickOnDraft}
            title='After saving in draft list, you can find it in draft list page.'
          >
            Save as draft
          </Button>
        </Col>
        <Col>
          <Button
            type='primary'
            htmlType='button'
            onClick={clickOnPublish}
            title='After publishing in article list, you can find it in article list page.'
          >
            Ready to publish
          </Button>
        </Col>
      </Row>
    </div>
  )
};

EditPageSaveOptionContent.propsType = {
  hidePopover: PropTypes.func.isRequired
};

export { EditPageSaveOption };