import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import { Row, Col, Button, Icon, Menu, Dropdown, Popover, Divider, Radio, Switch } from "antd";

import ArticleInfoSetting from './ArticleInfoSetting';

import styles from './Header.module.css';

class EditPageHeader extends Component {
  render() {
    return (
      <Row className={styles.header} type="flex" justify="start" align="middle">
        <Col span={4} offset={4}>
          <Link to={'/'}>
            <button className={styles.button}>
              Write Down
            </button>
          </Link>
        </Col>
        <Col span={1} offset={8}>
          <MoreButton/>
        </Col>
        <Col span={1}>
          <ArticleInfoSetting/>
        </Col>
        <Col span={1}>
          <SettingButton
            toggleDisplayMode={this.props.toggleDisplayMode}
            toggleScrollSync={this.props.toggleScrollSync}
          />
        </Col>
        <Col span={1}>
          <UserButton/>
        </Col>
      </Row>
    );
  }
}

class GeneralHeader extends Component {
  render() {
    return (
      <Row className={styles.header} type="flex" justify="start" align="middle">
        <Col span={4} offset={4}>
          <Link to={'/'}>
            <button className={styles.button}>
              Write Down
            </button>
          </Link>
        </Col>
        <Col span={1} offset={10}>
          <MoreButton/>
        </Col>
        {/*<Col span={1}>*/}
        {/*<NavButton/>*/}
        {/*</Col>*/}
        <Col span={1}>
          <UserButton/>
        </Col>
      </Row>
    );
  }
}

class Header3 extends Component {
  render() {
    return (
      <Row className={styles.header + ' ' + styles.home} type="flex" justify="start" align="middle">
        <Col span={4} offset={4}>
          <button className={styles.button}>
            Write Down
          </button>
        </Col>
        <Col span={1} offset={9}>
          <MoreButton/>
        </Col>
        <Col span={1}>
          <SettingButton
            toggleDisplayMode={this.props.toggleDisplayMode}
            toggleScrollSync={this.props.toggleScrollSync}
          />
        </Col>
        <Col span={1}>
          <UserButton/>
        </Col>
      </Row>
    );
  }
}


const MoreMenu = (
  <Menu>
    <Menu.Item key="1">Get</Menu.Item>
    <Menu.Item key="2">Some</Menu.Item>
    <Menu.Item key="3">Help</Menu.Item>
  </Menu>
);


const MoreButton = props => {
  return (
    <Dropdown
      className={styles.button}
      overlay={MoreMenu}
      trigger={['click']}
      placement='bottomCenter'
    >
      <Icon type="ellipsis" theme="outlined" />
    </Dropdown>
  );
};

// const NavMenu = (
//   <Menu>
//     <Menu.Item key="1">Get</Menu.Item>
//     <Menu.Item key="2">Some</Menu.Item>
//     <Menu.Item key="3">Help</Menu.Item>
//   </Menu>
// );
//
//
// const NavButton = props => {
//   return (
//     <Dropdown className={styles.button} overlay={NavMenu} trigger={['click']} placement='bottomCenter'>
//       <Icon type="bars" theme="outlined" />
//     </Dropdown>
//   );
// };

const EditorSettingMenu = props => (
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

EditorSettingMenu.propTypes = {
  toggleScrollSync: PropTypes.func.isRequired,
  toggleDisplayMode: PropTypes.func.isRequired
};

const SettingButton = props => {
  return (
    <Popover
      content={
        <EditorSettingMenu
          toggleScrollSync={props.toggleScrollSync}
          toggleDisplayMode={props.toggleDisplayMode}
        />
      }
      title="Editor Setting Controller"
      trigger={['click']}
    >
      <button className={styles.button}>
        <Icon type="setting" theme="outlined" />
      </button>
    </Popover>
  );
};

SettingButton.propTypes = {
  toggleScrollSync: PropTypes.func.isRequired,
  toggleDisplayMode: PropTypes.func.isRequired
};

const UserMenu = (
  <Menu>
    <Menu.Item key="1">
      <Link to={'/draft'}>New Article</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to={'/articles'}>My Articles</Link>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item key="3">
      <Link to={'/user'}>User Profile</Link>
    </Menu.Item>
    <Menu.Item key="4">Log out</Menu.Item>
  </Menu>
);

const UserButton = props => {
  return (
    <Dropdown
      className={styles.button}
      overlay={UserMenu}
      trigger={['click']}
      placement='bottomCenter'
    >
      <Icon type="user" theme="outlined" />
    </Dropdown>
  )
};

EditPageHeader.propTypes = {
  toggleScrollSync: PropTypes.func.isRequired,
  toggleDisplayMode: PropTypes.func.isRequired
};

export {
  EditPageHeader,
  GeneralHeader
};