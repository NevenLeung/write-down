import React from "react";
import { Input } from "antd";

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

export default PhotoSearchBar;