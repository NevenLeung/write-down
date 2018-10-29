import React, { Component } from "react";

import {Row, Col, Button, Icon, Menu, Dropdown, Divider} from 'antd';

import styles from './Header.module.css';

class Header extends Component {
  render() {
    return (
      <Row className="App-header" type="flex" justify="start" align="middle" >
        <Col span={4} offset={4}>
          <button className={styles.button}>
            {/*<Icon type="build" theme="outlined" />*/}
            Write Down
          </button>
        </Col>
        <Col span={1} offset={9}>
          <MoreButton/>
        </Col>
        <Col span={1}>
          <SettingButton/>
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
    <Dropdown className={styles.button} overlay={MoreMenu} trigger='click' placement='bottomCenter'>
      <Icon type="ellipsis" theme="outlined" />
    </Dropdown>
  );
};


const SettingMenu = (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd memu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);


const SettingButton = props => {
  return (
    <Dropdown className={styles.button} overlay={SettingMenu} trigger='click' placement='bottomCenter'>
      <Icon type="setting" theme="outlined" />
    </Dropdown>
  );
};

SettingButton.propTypes = {

};


const UserMenu = (
  <Menu>
    <Menu.Item key="1">New Article</Menu.Item>
    <Menu.Item key="2">My Articles</Menu.Item>
    <Divider className={styles.divider}/>
    <Menu.Item key="3">User Profile</Menu.Item>
    <Menu.Item key="4">Log out</Menu.Item>
  </Menu>
);

const UserButton = props => {
  return (
    <Dropdown className={styles.button} overlay={UserMenu} trigger='click' placement='bottomCenter'>
      <Icon type="user" theme="outlined" />
    </Dropdown>
  )
};


export default Header;