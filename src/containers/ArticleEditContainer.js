import { connect } from "react-redux";

import ArticleEdit from '../components/article-edit/ArticleEdit';

const mapState = (state, ownProps) => {
  const isLoggedIn = state.user.isLoggedIn;

  const idFromRedux = state.currentEdit;
  const idFromParams = ownProps.match.params.articleID;

  const articleID = idFromParams? idFromParams: idFromRedux;

  const selectedArticle = state.articles.data.find(article => article.id === articleID);

  if (selectedArticle && Object.keys(selectedArticle).length !== 0) {
    const { id, markdown, htmlOutput } = selectedArticle;

    return {
      id,
      markdown,
      htmlOutput,
      isLoggedIn
    };
  }

  return {isLoggedIn};
};

export default connect(
  mapState,
  null
)(ArticleEdit);