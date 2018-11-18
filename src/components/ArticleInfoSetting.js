import React, { Component } from "react";
import { Form, Icon, Input, Popover, Modal, Collapse ,Tabs, Button, Row, Col } from "antd";

import PhotoSearch from "./PhotoSearch";
import { checkImageUrlIsValid } from "../utils";
import mockData from './data';

import styles from "./ArticleInfoSetting.module.css";

const metaData = mockData[0];

class InfoSettingPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverUrl: '',
      isCoverUrlValid: false
    };
  }

  async componentDidMount() {
    const coverUrl = await checkImageUrlIsValid(metaData.coverUrl);

    if (coverUrl) {
      this.setState({
        coverUrl: coverUrl,
        isCoverUrlValid: true
      });
    } else {
      this.setState({
        coverUrl: coverUrl,
        isCoverUrlValid: false
      });
    }
  }


  render() {
    return (
      <div className={styles.infoPreviewWrapper}>
        {
          this.state.isCoverUrlValid
            ? <div className={styles.infoPreviewImageWrapper}>
                <div
                  className={styles.infoPreviewImage}
                  style={{backgroundImage: `url(${this.state.coverUrl})`}}
                />
              </div>
            : null
        }
        <div>
          <h2 className={styles.infoPreviewTitle}>{metaData.title}</h2>
          <p className={styles.infoPreviewExcerpt}>{metaData.excerpt}</p>
        </div>
      </div>
    );
  }
}

const InfoSettingButton = props => {
  return (
    <Popover
      content={<InfoSettingPreview/>}
      title="Article Info Preview"
      trigger={['hover']}
      mouseEnterDelay={0.5}
    >
      <button className={styles.button} onClick={props.onClick}>
        <Icon type="profile" theme="outlined" />
      </button>
    </Popover>
  );
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class ArticleInfoSettingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: ''
    };

    this.formRef = null;

    this.setFormRef = (form) => {
      this.formRef = form
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

    const data = this.formRef.props.form.getFieldsValue();
    console.log(data);
    console.log('ok');
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        {/*<button className={styles.button} type="primary" onClick={this.showModal}>*/}
          {/*<Icon type="profile" theme="outlined" />*/}
        {/*</button>*/}
        <InfoSettingButton onClick={this.showModal}/>
        <Modal
          style={{top: 20}}
          width={880}
          title="Article Info Setting"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          {/*<WrappedFormInModal wrappedComponentRef={this.setFormRef}/>*/}
          <WrappedFormInModal afterSubmit={this.handleCancel}/>
        </Modal>
      </div>
    );
  }
}

class ArticleInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverUrl: '',
      isUrlChanged: false,
      isCoverUrlValid: false,
      coverPreviewMsg: 'The preview of cover will be here.'
    };
  }

  componentDidMount() {
    // To load the cover based on saved url.
    this.checkCoverUrl(undefined, metaData.coverUrl, ()=>{});
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }


  selectCover = (cover) => {
    const form = this.props.form;

    form.setFieldsValue({ cover });

    this.checkCoverUrl(undefined, cover, () => {});
  };

  checkCoverUrl = async(rule, url, cb) => {
    if (url) {
      try {
        const coverUrl = await checkImageUrlIsValid(url);

        this.setState({
          coverUrl: coverUrl,
          isUrlChanged: true,
          isCoverUrlValid: true
        });
      } catch (error) {
        this.setState({
          coverPreviewMsg: 'The url of cover is invalid. Please check the url.',
          isUrlChanged: true,
          isCoverUrlValid: false
        });
      }
    }

    cb();
  };

  onSubmit = (e) => {
    e.preventDefault();
    const data = this.props.form.getFieldsValue();
    // 这里只需要使用data提交表单的数据即可
    console.log(data);
    this.props.afterSubmit();
    // console.log(metaData);
  };

  render() {
    const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;

    const titleError = isFieldTouched('userName') && getFieldError('userName');
    const excerptError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
        <Form>
          <Form.Item
            {...formItemLayout}
            label={'Title'}
            // validateStatus={titleError ? 'error' : ''}
            // help={titleError || ''}
          >
            {getFieldDecorator('title', {
              initialValue: metaData.title,
              rules: [
                {
                  required: true,
                  message: 'Please input your article title. ',
                },
                {
                  max: 100,
                  message: 'The maximum letters of title is 100. '
                }
              ]
            })(
              <Input placeholder="Please input your article title." />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={'Excerpt'}
            // validateStatus={excerptError ? 'error' : ''}
          >
            {getFieldDecorator('excerpt', {
              initialValue: metaData.excerpt,
              rules: [
                {
                  required: true,
                  message: 'Please input your article excerpt. ',
                },
                {
                  max: 400,
                  message: 'The maximum letters of excerpt is 400. '
                }
              ]
            })(
              <Input.TextArea
                rows={8}
                autosize={true}
                placeholder='Please input your article excerpt.'
              />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={'Cover Url'}
          >
            {getFieldDecorator('cover', {
              initialValue: metaData.coverUrl,
              rules: [{
                validator: this.checkCoverUrl
              }]
            })(
              <Input placeholder="Please input a valid url of the cover of your article. " />
            )}
          </Form.Item>
          <Row>
            <Col span={6} className={styles.submitButtonWrapper}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                  onClick={this.onSubmit}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col span={14}>
              <div className={styles.coverPreviewArea}>
                {
                  this.state.isCoverUrlValid
                    ? <img className={styles.coverPreviewImage} src={this.state.coverUrl} alt=" loading..."/>
                    : (
                      <div className={styles.coverPreviewAreaTipWrapper}>
                        {
                          this.state.isUrlChanged
                            ? <p className={styles.coverPreviewAreaTipWithFeedback}>{this.state.coverPreviewMsg}</p>
                            : <p className={styles.coverPreviewAreaTip}>{this.state.coverPreviewMsg}</p>
                        }
                      </div>
                    )
                }
              </div>
            </Col>
          </Row>
        </Form>
        <div>
          <Collapse bordered={false}>
            <Collapse.Panel header={"Tips for setting cover"} key={"tips"}>
              <pre className={styles.coverSettingTip}>
              Choose an approach to set your cover:
              <br/>
              1. Search photo from Unsplash by keyword and click on the photo you selected. The url of the photo will be filled in automatically.
              <br/>
              2. Upload the cover to image hosting service, and paste the valid image url to the cover field.
              <br/>
              <br/>
              Important: Image in landscape mode is recommended.
              </pre>
            </Collapse.Panel>
          </Collapse>

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Choose a photo from Unsplash" key="1">
              <PhotoSearch selectCover={this.selectCover}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Upload your photo" key="2">
              <div style={{marginTop: 12}}>
                <pre className={styles.coverSettingTip}>
                  You can use any image hosting service to store your cover, like <a href="http://imgur.com/" target="_blank" rel="noopener noreferrer">Imgur</a>, <a href="https://www.dropbox.com/" target="_blank" rel="noopener noreferrer">Dropbox</a>, <a href="https://imageshack.us/" target="_blank" rel="noopener noreferrer">Imageshack</a>, and other free image hosting service.
                  <br/>
                  <br/>
                  Remember to paste url back to the cover field.
                </pre>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const WrappedFormInModal = Form.create()(ArticleInfoForm);

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


export default ArticleInfoSettingModal;