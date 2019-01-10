import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Col, Icon, Row, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

import styles from "./ArticleList.module.css";
import { checkImageUrlIsValid } from "../../utils/index";

dayjs.extend(relativeTime);

class ArticleItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      coverUrl: '',
      isCoverUrlValid: false,
    };
  }

  async componentDidMount() {
    try {
      const coverUrl = await checkImageUrlIsValid(this.props.metaData.cover.url);

      this.setState({
        coverUrl: coverUrl,
        isCoverUrlValid: true
      });
    } catch (error) {

    }
  }

  handleEdit = () => {
    this.props.editArticle();
  };

  handleDelete = () => {
    this.props.deleteArticle();
  };

  render() {
    const { id, title, author, tags, excerpt, updatedAt } = this.props.metaData;

    const { isLoggedIn } = this.props;

    return (
      <div className={styles.itemWrapper}>
        {
          this.state.isCoverUrlValid
            ?
            <div className={styles.imageWrapper}>
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
          <p className={styles.excerpt}>
            {
              excerpt.length > 300
                ? (
                <span>
                  {excerpt.slice(0, 300) + ' ... '}<a href = "#" >Read More</a>
                </span>
                ) : (
                <span>
                  {excerpt + ' '} &nbsp; <a href="#">Read More</a>
                </span>
                )
            }
          </p>
          <Row className={styles.bottomBar} type='flex' justify='space-between'>
            <Col>
              <div className={styles.tagList}>
                <TagGroup tags={tags}/>
              </div>
            </Col>
            <Col>
              {
                isLoggedIn
                  ?
                  <div>
                    <button
                      className={styles.editOption}
                      onClick={this.handleDelete}
                      title='Notice! It will delete the article from Database.'>
                      <Icon type="delete" />
                    </button>
                    <Link to={`/article/${id}/edit`}>
                      <button
                        className={styles.editOption} title='Jump to the edit page.'
                        onClick={this.handleEdit}
                      >
                        <Icon type="edit" />
                      </button>
                    </Link>
                  </div>
                  : null
              }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const TagGroup = ({ tags }) => (
  <div>
    {
      tags.map((tag) => {
        const isLongTag = tag.length > 10;
        const tagElem = (
          <Tag key={tag}>
            {isLongTag ? `${tag.slice(0, 10)}...` : tag}
          </Tag>
        );
        return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
      })
    }
  </div>
);

TagGroup.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default ArticleItem;