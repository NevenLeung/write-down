import React from "react";
import { Col, Row, Divider, BackTop } from "antd";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import { GeneralHeader as Header } from '../header/TheHeader';
import ArticleDraftItem from './ArticleDraftListItem';

import styles from "./ArticleList.module.css";

dayjs.extend(relativeTime);

const ArticleDraftListPage = ({ drafts, isLoggedIn, selectArticle, removeArticle }) => {
  let DraftList = undefined;

  if (Array.isArray(drafts)) {
    DraftList = drafts.map(data => (
      <ArticleDraftItem
        metaData={data}
        key={data.id}
        isLoggedIn={isLoggedIn}
        selectArticle={() => selectArticle(data.id)}
        deleteArticle={() => removeArticle(data.id)}
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
          <Divider className={styles.pageIndicator}>Draft list</Divider>
          {DraftList? DraftList: null}
          <BackTop/>
        </Col>
        <Col md={4} sm={2} xs={0}>

        </Col>
      </Row>
    </>
  );
};

export default ArticleDraftListPage;