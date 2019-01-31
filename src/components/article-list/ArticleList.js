import React from "react";
import { Col, Row, Divider, BackTop } from "antd";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import { GeneralHeader as Header } from '../header/TheHeader';
import ArticleItem from './ArticleListItem';

import styles from "./ArticleList.module.css";

dayjs.extend(relativeTime);

const ArticlesPage = ({ articles, isLoggedIn, editArticle, deleteArticle }) => {
  let ArticleList = undefined;

  if (Array.isArray(articles)) {
    ArticleList = articles.map(data => (
      <ArticleItem
        metaData={data}
        key={data.id}
        isLoggedIn={isLoggedIn}
        editArticle={() => editArticle(data.id)}
        deleteArticle={() => deleteArticle(data.id)}
      />
    ));
  }

  return (
    <>
      <Header/>
      <Row>
        <Col md={4} sm={2} xs={0}>

        </Col>
        <Col className={styles.list} md={16} sm={20} xs={24}>
          <Divider className={styles.pageIndicator}>Article list</Divider>
          {ArticleList? ArticleList: null}
          <BackTop/>
        </Col>
        <Col md={4} sm={2} xs={0}>

        </Col>
      </Row>
    </>
  );
};

export default ArticlesPage;