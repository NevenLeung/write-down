import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import PropTypes from 'prop-types';

import './ArticleEdit.css';

let exampleText = `# H1

## H2

### H3

[Google](https://www.google.com)

- one
- two
- three


\`\`\`javascript
var name = {}; 
\`\`\`

__markdown-it__

> this is a blockquote

`;

class MarkdownPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: exampleText
    };
  }

  handleContentUpdate = e => {
    const value = e.target.value;
    this.setState({
      content: value
    });
  };

  render() {
    // let md = new MarkdownIt();
    let renderResult = {
      __html: new MarkdownIt().render(this.state.content)
    };

    return (
      <div className="edit-wrapper">
        <div>
          <EditPanel content={this.state.content} handleUpdate={this.handleContentUpdate}/>
        </div>
        <div>
          {/*<div dangerouslySetInnerHTML={renderResult}/>*/}
          <DisplayPanel renderResult={renderResult}/>
        </div>
      </div>
    );
  }
}

function EditPanel(props) {
  return (
    <textarea name="" id="" cols="80" rows="30" value={props.content} onChange={props.handleUpdate}/>
  )
}

EditPanel.propTypes = {
  content: PropTypes.string,
  handleUpdate: PropTypes.func
};

function DisplayPanel(props) {
  return (
    <div dangerouslySetInnerHTML={props.renderResult}/>
  )
}

DisplayPanel.propTypes = {
  renderResult: PropTypes.object
};



export default MarkdownPanel;
