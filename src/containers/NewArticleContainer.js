import {connect} from "react-redux";

import ArticleEdit from '../components/article-edit/ArticleEdit';

const mapState = (state) => {
  const newArticle = state.articles[0];

  const { id, markdown, htmlOutput } = newArticle;

  return {
    id,
    markdown,
    htmlOutput
  };
};

export default connect(
  mapState,
  null
)(ArticleEdit);