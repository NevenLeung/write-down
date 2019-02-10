import React from "react";
import { Col, Row, Divider, BackTop, Spin } from "antd";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import { GeneralHeader as Header } from '../header/TheHeader';
import ArticleItem from './ArticleListItem';

import styles from "./ArticleList.module.css";

dayjs.extend(relativeTime);

const ArticlesPage = ({ articles, isFetching, isLoggedIn, selectArticle, removeArticle }) => {
  let ArticleList = undefined;

  if (Array.isArray(articles)) {
    ArticleList = articles.map(data => (
      <ArticleItem
        metaData={data}
        key={data.id}
        isLoggedIn={isLoggedIn}
        selectArticle={() => selectArticle(data.id)}
        deteleArticle={() => removeArticle(data.id)}
      />
    ));
  }

  return (
    <div className={styles.pageContainer}>
      {
        isFetching?
          (
            <div className={styles.spinContainer}>
              <Spin tip={'Loading...'}/>
            </div>
          ) :  null
      }
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
    </div>
  );
};

export default ArticlesPage;