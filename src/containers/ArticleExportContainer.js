import { connect } from "react-redux";

import { MoreButtonInEditPage } from '../components/header/MoreButtonInEditPage';

const articleExportMapState = (state, ownProps) => {
  const articleID = ownProps.id;

  const selectedArticle = state.articles.find(article => article.id.toString() === articleID);

  if (selectedArticle && Object.keys(selectedArticle).length !== 0) {
    const { title, author, excerpt, cover, markdown, htmlOutput } = selectedArticle;

    return {
      title,
      author,
      excerpt,
      cover,
      markdown,
      htmlOutput
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