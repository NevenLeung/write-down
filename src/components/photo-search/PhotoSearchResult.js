import React, { Component } from "react";
import { Icon, Pagination } from "antd";
import StackGrid from "react-stack-grid";

import { unsplash } from "../../utils/unsplash-service";

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

class Photo extends Component {
  state = {
    photoLink: '',
    thumbUrl: '',
    regularUrl: '',
    username: '',
    userLink: ''
  };

  componentDidMount() {
    const photoData = this.props.photo;

    this.setState({
      photoLink: photoData.links.html,
      thumbUrl: photoData.urls.thumb,
      regularUrl: photoData.urls.regular,
      username: photoData.user.name,
      userLink: photoData.user.links.html,
    });
  }

  onClick = () => {
    const photoData = {
      photoUrl: this.state.regularUrl,
      photoAuthorName: this.state.username,
      photoAuthorLink: this.state.userLink
    };

    this.props.onPhotoSelect(photoData);

    // To trigger a download in unsplash statics.
    unsplash.photos.downloadPhoto(this.props.photo);
  };

  render() {
    return (
      <div className={styles.photoItemWrapper}>
        <img
          className={styles.photo + ' photo'}
          src={this.state.thumbUrl}
          alt=" loading..."
          onClick={this.onClick}
        />

        <div className={styles.photoMask}/>

        <span className={styles.photoAuthor}>
          @
          <a
            href={this.state.userLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.username}
          </a>
        </span>

        <a className={styles.photoLink}
           href={this.state.photoLink}
           target="_blank"
           rel="noopener noreferrer"
        >
          <Icon type="link" theme="outlined"/>
        </a>
      </div>
    );
  }
}

export default PhotoSearchResult;