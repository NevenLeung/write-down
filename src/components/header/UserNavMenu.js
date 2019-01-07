import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import styles from "./Header.module.css";

const UserNavMenu = (props) => {
  const handleClickOnNewArticle = () => {
    props.createNewArticle();
  };

  return (
    <Menu {...props}>
      <Menu.Item key="1">
        <Link to={'/articles/new'}>
          <button className={styles.navMenuOption} onClick={handleClickOnNewArticle}>
            New Article
          </button>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={'/draft'}>My Draft</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={'/articles'}>My Articles</Link>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="4">
        <Link to={'/user'}>User Profile</Link>
      </Menu.Item>
      <Menu.Item key="5">Log out</Menu.Item>
    </Menu>
  );
};

export { UserNavMenu };