import React from 'react';

import { Row, Col } from 'antd';

import styles from './ArticleRead.modules.css';

const ArticleRead = (props) => {


  return (
    <Row type="flex" justify="center" align="middle">
      <Col className={styles.container}>
        <Title/>
        <HeaderPhoto/>
        <Excerpt/>
        <Content/>
      </Col>
    </Row>
  )
};

const Title = () => (
  <div>
    Title
  </div>
);

const HeaderPhoto = () => (
  <div>
    Header Photo
  </div>
);

const Excerpt = () => (
  <div>
    Excerpt
  </div>
);

const Content = () => (
  <div>
    content
  </div>
);

export default ArticleRead;