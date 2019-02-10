import React from "react";
import { Link } from "react-router-dom";
import { Menu, message } from "antd";

import { LoginModal } from '../login/Login';

import styles from "./Header.module.css";

const UserNavMenu = (props) => {
  const { createArticle, userLogout, isLoggedIn, ...rest } = props;

  const handleClickOnNewArticle = () => {
    createArticle();
  };

  const handleLogout = () => {
    userLogout();
    message.success('You have logged out.')
  };

  return (
    <>
      {
        isLoggedIn
          ? (
            <Menu {...rest}>
              <Menu.Item key="1">
                <Link to={'/article/new'}>
                  <button className={styles.navMenuOption} onClick={handleClickOnNewArticle}>
                    New Article
                  </button>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={'/drafts'}>My Draft</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={'/articles'}>My Articles</Link>
              </Menu.Item>
              <Menu.Divider/>
              {/*<Menu.Item key="4">*/}
              {/*<Link to={'/user'}>User Profile</Link>*/}
              {/*</Menu.Item>*/}
              <Menu.Item key="5">
                <button className={styles.navMenuOption} onClick={handleLogout}>
                  Log out
                </button>
              </Menu.Item>
            </Menu>
          ) : (
            <Menu {...rest}>
              <Menu.Item key="6">
                <LoginModal/>
              </Menu.Item>
            </Menu>
          )
      }
    </>
  );
};

export { UserNavMenu };