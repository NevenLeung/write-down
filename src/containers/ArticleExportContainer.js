import { connect } from "react-redux";

import { MoreButtonInEditPage } from '../components/header/MoreButtonInEditPage';

const articleExportMapState = (state) => {
  const articleData = state.articles.currentEditing;

  if (articleData && Object.keys(articleData).length !== 0) {
    return {
      title: articleData.title,
      markdown: articleData.markdown,
      htmlOutput: articleData.htmlOutput
    };
  }

  return {};
};

const ArticleExportContainer = connect(
  articleExportMapState,
  null
)(MoreButtonInEditPage);

export {
  ArticleExportContainer,
};