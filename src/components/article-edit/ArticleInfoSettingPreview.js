import React, { Component } from "react";

import { checkImageUrlIsValid } from "../../utils";

import styles from "./ArticleInfoSetting.module.css";

class InfoSettingPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverUrl: '',
      isCoverUrlValid: false
    };
  }

  render() {
    const { title, excerpt, coverUrl } = this.props;

    return (
      <div className={styles.infoPreviewWrapper}>
        {
          coverUrl
            ? <div className={styles.infoPreviewImageWrapper}>
              <div
                className={styles.infoPreviewImage}
                style={{backgroundImage: `url(${coverUrl})`}}
              />
            </div>
            : null
        }
        <div>
          <h2 className={styles.infoPreviewTitle}>{title}</h2>
          <p className={styles.infoPreviewExcerpt}>{excerpt}</p>
        </div>
      </div>
    );
  }
}

export { InfoSettingPreview };