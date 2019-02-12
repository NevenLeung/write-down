import React from "react";
import { Dropdown, Icon, Menu } from "antd";

import styles from "./Header.module.css";

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
      <Icon type="ellipsis" theme="outlined" title="Others" />
    </Dropdown>
  );
};

export {MoreButton};