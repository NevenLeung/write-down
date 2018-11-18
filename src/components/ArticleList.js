import React, { Component } from "react";

import mockData from './data';
import { checkImageUrlIsValid } from "../utils";
import styles from "./ArticleList.module.css";

const metaData = mockData[0];

class ArticleList extends Component {
  render() {
    return (
      <div>
        {
          mockData.forEach(data => {
            return <ArticleItem metaDate={data}/>
          })
        }
      </div>
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
    const coverUrl = await checkImageUrlIsValid(this.props.metaData.coverUrl);

    if (coverUrl) {
      this.setState({
        coverUrl: coverUrl,
        isCoverUrlValid: true
      });
    } else {
      this.setState({
        coverUrl: coverUrl,
        isCoverUrlValid: false
      });
    }
  }


  render() {
    return (
      <div className={styles.itemWrapper}>
        {
          this.state.isCoverUrlValid
            ? <div className={styles.itemImageWrapper}>
              <div
                className={styles.itemImage}
                style={{backgroundImage: `url(${this.state.coverUrl})`}}
              />
            </div>
            : null
        }
        <div>
          <h2 className={styles.itemTitle}>{metaData.title}</h2>
          <p className={styles.itemExcerpt}>{metaData.excerpt}</p>
        </div>
      </div>
    );
  }
}


export default ArticleList;