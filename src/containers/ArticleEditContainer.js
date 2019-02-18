import { connect } from "react-redux";

import { updateContentEditStatus } from "../ducks/currentEdit";

import ArticleEdit from '../components/article-edit/ArticleEdit';

const mapState = (state, ownProps) => {
  const isLoggedIn = state.user.isLoggedIn;
  const isMarkdownTouch = state.currentEdit.isTouch;

  const idFromRedux = state.currentEdit.id;
  const idFromParams = ownProps.match.params.articleID;

  const articleID = idFromParams? idFromParams: idFromRedux;

  const selectedArticle = state.articles.data.find(article => article.id === articleID);

  if (selectedArticle && Object.keys(selectedArticle).length !== 0) {
    const { id, markdown, htmlOutput } = selectedArticle;

    return {
      id,
      markdown,
      htmlOutput,
      isMarkdownTouch,
      isLoggedIn
    };
  }

  return {isLoggedIn};
};

const mapDispatch = {
  updateContentEditStatus
};

export default connect(
  mapState,
  mapDispatch
)(ArticleEdit);