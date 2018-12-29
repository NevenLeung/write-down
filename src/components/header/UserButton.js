import React from "react";
import { Link } from "react-router-dom";

import { Dropdown, Icon, Menu } from "antd";

import styles from "./Header.module.css";

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

export { UserButton };