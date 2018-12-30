import { connect } from "react-redux";

import ArticleEdit from '../components/article-edit/ArticleEdit';

const mapState = (state) => {
  const articleData = state.articles.currentEditing;

  if (articleData && Object.keys(articleData).length !== 0) {
    return {
      id: articleData.id,
      markdown: articleData.markdown,
      htmlOutput: articleData.htmlOutput
    };
  }

  return {};
};

const ArticleEditContainer = connect(
  mapState,
  null
)(ArticleEdit);

export {
  ArticleEditContainer,
};