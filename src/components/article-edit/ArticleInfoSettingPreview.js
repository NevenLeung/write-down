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

  async componentDidMount() {
    try {
      const coverUrl = await checkImageUrlIsValid(this.props.coverUrl);

      this.setState({
        coverUrl: coverUrl,
        isCoverUrlValid: true
      });
    } catch (error) {

    }
  }

  render() {
    const { title, excerpt } = this.props;

    return (
      <div className={styles.infoPreviewWrapper}>
        {
          this.state.isCoverUrlValid
            ? <div className={styles.infoPreviewImageWrapper}>
              <div
                className={styles.infoPreviewImage}
                style={{backgroundImage: `url(${this.state.coverUrl})`}}
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