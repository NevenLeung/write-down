import React, { Component } from "react";
import { Col, Row, Tag } from "antd";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import { GeneralHeader as Header } from './Header';
import mockData from './data';
import { checkImageUrlIsValid } from "../utils";

import styles from "./ArticleList.module.css";

dayjs.extend(relativeTime);

class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: [],
    };
  }

  componentDidMount() {
    this.setState({
      src: mockData
    });
  }


  render() {
    const ArticleList = this.state.src.map(data => (
      <ArticleItem metaData={data} key={data._id}/>
    ));


    return (
      <>
        <Header/>
        <Row>
          <Col span={4}>

          </Col>
          <Col span={16} className={styles.list}>
            {ArticleList}
          </Col>
          <Col span={4}>

          </Col>

        </Row>
      </>
    );
  }
}

class ArticleItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      coverUrl: '',
      isCoverUrlValid: false
    };
  }

  async componentDidMount() {
    try {
      const coverUrl = await checkImageUrlIsValid(this.props.metaData.coverUrl);

      this.setState({
        coverUrl: coverUrl,
        isCoverUrlValid: true
      });
    } catch (error) {

    }
  }

  render() {
    const { title, author, excerpt, updatedAt, tags } = this.props.metaData;

    const tagList = tags.map((tag, index) => {
      if (index % 4 === 0) {
        return <Tag color={'orange'} key={index}>{tag}</Tag>;
      } else if(index % 4 === 1) {
        return <Tag color={'green'} key={index}>{tag}</Tag>;
      } else if(index % 4 === 2) {
        return <Tag color={'volcano'} key={index}>{tag}</Tag>;
      } else {
        return <Tag color={'blue'} key={index}>{tag}</Tag>;
      }
    });

    return (
      <div className={styles.itemWrapper}>
        {
          this.state.isCoverUrlValid
            ? <div className={styles.imageWrapper}>
              <div
                className={styles.image}
                style={{backgroundImage: `url(${this.state.coverUrl})`}}
              />
            </div>
            : null
        }
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>{title}</h2>
          <Row className={styles.infoWrapper} type='flex' justify='space-between'>
            <Col>
              Posted by <span className={styles.author}>{author}</span>
            </Col>
            <Col>
              <span className={styles.postedTime}>{dayjs(updatedAt).fromNow()}</span>
            </Col>
          </Row>
          <p className={styles.excerpt}>{excerpt.trim()}</p>
          <div className={styles.tagListWrapper}>
            <div className={styles.tagList}>
              {tagList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ArticlesPage;