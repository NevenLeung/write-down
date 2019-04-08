import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Col, Icon, Popconfirm, Row, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

import styles from "./ArticleList.module.css";
import { checkImageUrlIsValid } from "../../utils/index";

dayjs.extend(relativeTime);

class ArticleDraftListItem extends Component{
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
    this.props.selectArticle();
  };

  handleDelete = () => {
    this.props.deleteArticle();
  };

  render() {
    const { id, title, author, tags, excerpt, updatedAt, postedAt } = this.props.metaData;

    const { isLoggedIn } = this.props;

    const DisplayUpdatedTime = (
      <span>Updated on {dayjs(updatedAt).format('MMM. D, YYYY')}</span>
    );

    return (
      <div className={styles.itemWrapper}>
        {
          this.state.isCoverUrlValid
            ? (
              <div className={styles.imageWrapper}>
                <div
                  className={styles.image}
                  style={{backgroundImage: `url(${this.state.coverUrl})`}}
                />
              </div>
            ) : (
              null
            )
        }
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>
            <Link to={`/article/${id}/read`}>{title}</Link>
          </h2>
          <Row className={styles.infoWrapper} type='flex' justify='space-between'>
            <Col>
              Posted by <span className={styles.author}>{author}</span>
            </Col>
            <Col>
              {
                dayjs(updatedAt).format('M. D, YYYY') === dayjs(postedAt).format('M. D, YYYY')
                  ? (
                    <span>
                      {dayjs(postedAt).fromNow()}
                    </span>
                  ) : (
                    <Tooltip title={DisplayUpdatedTime}>
                      <div className={styles.postedTimeWithUpdated}>
                        {dayjs(postedAt).fromNow()}
                      </div>
                    </Tooltip>
                  )
              }
            </Col>
          </Row>
          <p className={styles.excerpt}>
            {
              excerpt.length > 300
                ? (
                  <span>
                    {excerpt.slice(0, 300) + ' ... '}
                    <span className={styles.readMoreLink}>
                      <Link to={`/article/${id}/read`}>
                        Read More
                      </Link>
                    </span>
                  </span>
                ) : (
                  <span>
                    {excerpt + ' '} &nbsp;
                    <span className={styles.readMoreLink}>
                      <Link to={`/article/${id}/read`}>
                        Read More
                      </Link>
                    </span>
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
                  ? (
                    <div>
                      <Popconfirm
                        title={'Are you sure to delete this article?'}
                        okText={'Yes'}
                        onConfirm={this.handleDelete}
                      >
                        <button
                          className={styles.editOption}
                        >
                          <Icon type="delete" />
                        </button>
                      </Popconfirm>
                      <Link to={`/draft/${id}/edit`}>
                        <button
                          className={styles.editOption}
                          onClick={this.handleEdit}
                          title='Jump to the edit page.'
                        >
                          <Icon type="edit" />
                        </button>
                      </Link>
                    </div>
                  ) : (
                    null
                  )
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

export default ArticleDraftListItem;