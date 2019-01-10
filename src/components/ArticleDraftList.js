import React, { Component } from "react";
import { Col, Row, Divider } from "antd";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import { GeneralHeader as Header } from './header/Header';
import ArticleDraftItem from './ArticleDraftListItem';
// import mockData from './data';

import styles from "./ArticleList.module.css";

dayjs.extend(relativeTime);

class ArticleDraftListPage extends Component {
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
    let DraftList = undefined;

    if (Array.isArray(this.props.drafts)) {
      DraftList = this.props.drafts.map(data => (
        <ArticleDraftItem
          metaData={data}
          key={data.id}
          isLoggedIn={this.state.isLoggedIn}
          editDraft={() => this.props.editDraft(data.id)}
          deleteArticleFromDraft={() => this.props.deleteArticleFromDraft(data.id)}
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
          </Col>
          <Col md={4} sm={2} xs={0}>

          </Col>

        </Row>
      </>
    );
  }
}

export default ArticleDraftListPage;