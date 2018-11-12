import React, { Component } from "react";
import { Icon, Pagination } from "antd";
import StackGrid from "react-stack-grid";

import styles from './PhotoSearch.module.css';
import './PhotoSearch.css';

class PhotoSearchList extends Component {
  selectPhoto = (photoLink) => {
    this.props.onSelect(photoLink);
  };

  onPageChange = (newPage) => {
    console.log(newPage);
    this.props.onPageChange(newPage);
  };

  render() {
    const total = this.props.data.total;
    const results = this.props.data.results;

    let PhotoItems;

    if (typeof total === 'undefined') {
      return null;
    } else if (total === 0) {
      return (
        <div className={styles.noImageFeedback}>
          No photos match your requirement.
        </div>
      )
    } else {
      if (results && results.length > 0) {

        PhotoItems = results.map(img =>
          <Photo
            thumbUrl={img.urls.thumb}
            regularUrl={img.urls.regular}
            user={img.user.links.html}
            name={img.user.name}
            link={img.links.html}
            key={img.id}
            onPhotoSelect={this.selectPhoto}
          />
        );

        return (
          <div className={styles.photoGridContainer}>
            <Pagination
              className={styles.pager}
              simple
              current={this.props.currentPage}
              pageSize={this.props.pageSize}
              total={total}
              onChange={this.onPageChange}
            />

            <StackGrid
              className={styles.photoGrid}
              columnWidth={210}
              monitorImagesLoaded={true}
            >
              {PhotoItems}
            </StackGrid>

            <Pagination
              className={styles.pager}
              simple
              current={this.props.currentPage}
              pageSize={this.props.pageSize}
              total={total}
              onChange={this.onPageChange}
            />
          </div>
        );
      }
    }
  }
}

class Photo extends Component {
  onClick = () => {
    this.props.onPhotoSelect(this.props.regularUrl);
  };

  render() {
    return (
      <div className={styles.photoItemContainer + ' photo-container'}>
        <img
          className={styles.photo + ' photo'}
          src={this.props.thumbUrl}
          alt=" loading..."
          onClick={this.onClick}
        />

        <div className={styles.photoMask + ' photo-mask'}/>

        <span className={styles.photoAuthor + ' photo-author'}>
          @
          <a
            href={this.props.user}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.name}
          </a>
        </span>

        <a className={styles.photoLink + ' photo-link'}
           href={this.props.link}
           target="_blank"
           rel="noopener noreferrer"
        >
          <Icon type="link" theme="outlined"/>
        </a>
      </div>
    );
  }
}

export default PhotoSearchList;