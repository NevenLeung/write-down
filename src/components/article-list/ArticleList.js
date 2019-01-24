import React, { Component } from "react";
import { Col, Row, Divider, BackTop } from "antd";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import { GeneralHeader as Header } from '../header/Header';
import ArticleItem from './ArticleListItem';
// import mockData from './data';

import styles from "./ArticleList.module.css";

dayjs.extend(relativeTime);

class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // src: [],
      isLoggedIn: true
    };
  }

  componentDidMount() {
    // this.setState({
    //   src: mockData
    // });
  }


  render() {
    let ArticleList = undefined;

    if (Array.isArray(this.props.articles)) {
      ArticleList = this.props.articles.map(data => (
        <ArticleItem
          metaData={data}
          key={data.id}
          isLoggedIn={this.state.isLoggedIn}
          deleteArticle={() => this.props.deleteArticle(data.id)}
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
  }
}

export default ArticlesPage;