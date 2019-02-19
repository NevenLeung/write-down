import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

import { GeneralHeader as Header } from "../header/TheHeader";

import styles from './NoMatch.module.css';

const NoMatchPage = () => (
  <div>
    <Header/>
    <NoMatchMessage/>
  </div>
);

const NoMatchMessage = () => (
  <Row type="flex" justify="center" align="middle">
    <Col className={styles.messageContainer}>
      <h1>404 Not Found</h1>
      <p className={styles.message}>
        Click <Link to="/articles">here</Link> to the article list page
      </p>
    </Col>
  </Row>
);

export default NoMatchPage;