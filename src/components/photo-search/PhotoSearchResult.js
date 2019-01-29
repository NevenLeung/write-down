import React, { Component } from "react";
import { Icon, Pagination } from "antd";
import StackGrid from "react-stack-grid";

import { unsplash } from "../../utils";

import styles from './PhotoSearch.module.css';

class PhotoSearchResult extends Component {
  selectPhoto = (photoData) => {
    this.props.onSelect(photoData);
  };

  onPageChange = (newPage) => {
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

        PhotoItems = results.map(photo =>
          <Photo
            key={photo.id}
            photo={photo}
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
              gutterWidth={16}
              gutterHeight={16}
              columnWidth={195}
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

const Photo = ({ photo, onPhotoSelect }) => {
  const photoLink = photo.links.html;
  const thumbUrl = photo.urls.thumb;
  const regularUrl = photo.urls.regular;
  const username = photo.user.name;
  const userLink = photo.user.links.html;

  const onClick = () => {
    const photoInfoForStorage = {
      photoUrl: regularUrl,
      photoAuthorName: username,
      photoAuthorLink: userLink
    };

    onPhotoSelect(photoInfoForStorage);

    // To trigger a download in unsplash statics.
    unsplash.photos.downloadPhoto(photo);
  };

  return (
    <div className={styles.photoItemWrapper}>
      <img
        className={styles.photo + ' photo'}
        src={thumbUrl}
        alt=" loading..."
        onClick={onClick}
      />

      <div className={styles.photoMask}/>

      <span className={styles.photoAuthor}>
        @
        <a
          href={userLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {username}
        </a>
      </span>

      <a className={styles.photoLink}
         href={photoLink}
         target="_blank"
         rel="noopener noreferrer"
      >
        <Icon type="link" theme="outlined"/>
      </a>
    </div>
  );
};

export default PhotoSearchResult;