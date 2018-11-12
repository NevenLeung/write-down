import React, { Component } from "react";
import { Row, Col, Input } from 'antd'

import Unsplash, {toJson  } from 'unsplash-js';

import PhotoSearchList from './PhotoSearchList';



const unsplash = new Unsplash({
  applicationId: "{APP_ACCESS_KEY}",
  secret: "{APP_SECRET}",
  callbackUrl: "{CALLBACK_URL}"
});


class PhotoSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      currentPage: 1,
      dataResult: '',
    };

    this.pageSize = 12;
  }

  getTheKeyword = (keyword) => {
    this.setState({
      keyword: keyword,
      currentPage: 1
    });

    this.doSearch(keyword, this.state.currentPage);
  };

  onPageChange = (newPage) => {
    this.setState({
      currentPage: newPage
    });

    this.doSearch(this.state.keyword, newPage);
  };

  doSearch = (keyword, currentPage) => {
    unsplash.search.photos(keyword, currentPage, this.pageSize)
      .then(toJson)
      .then(searchResult => {
        this.setState({
          dataResult: searchResult
        });
      });
  };

  SelectPhoto = (photoLink) => {
    // photoID
    this.props.selectCover(photoLink);
  };

  render() {
    return (
      <div style={{marginTop: 12}}>
        <Row type="flex"  justify="center" align="middle">
          <Col style={{width: '300px'}}>
            <PhotoSearchBar getTheKeyword={this.getTheKeyword}/>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col>
            <PhotoSearchList
              data={this.state.dataResult}
              onSelect={this.SelectPhoto}
              currentPage={this.state.currentPage}
              pageSize={this.pageSize}
              onPageChange={this.onPageChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

class PhotoSearchBar extends React.Component {
  onSearch = (value) => {
    this.props.getTheKeyword(value);
  };

  render() {
    return (
      <Input.Search
        placeholder="Input your keyword, like beach"
        onSearch={this.onSearch}
        enterButton
      />
    );
  }
}

export default PhotoSearch;

