import { connect } from "react-redux";

import { MoreButtonInEditPage } from '../components/header/MoreButtonInEditPage';

const articleExportMapState = (state) => {
  const articleID = state.currentEdit.id;

  const selectedArticle = state.articles.data.find(article => article.id.toString() === articleID);

  if (selectedArticle && Object.keys(selectedArticle).length !== 0) {
    const { title, author, excerpt, cover, markdown, postedAt } = selectedArticle;

    return {
      title,
      author,
      excerpt,
      cover,
      markdown,
      postedAt
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