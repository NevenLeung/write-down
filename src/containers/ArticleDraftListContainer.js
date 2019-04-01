import {connect} from "react-redux";

import { selectArticle, removeArticle, removeArticleStatusReset } from '../ducks/articles';

import DraftList from '../components/article-list/ArticleDraftList';

const selectTheDraftArticles = (list = []) => {
  return list.filter((article) => article.isPublished === false);
};


const mapState = (state) => (
  {
    drafts: selectTheDraftArticles(state.articles.data),
    isLoggedIn: state.user.isLoggedIn,
    isRemovingFinished: state.articles.isRemovingFinished,
    error: state.articles.error
  }
);

const mapDispatch = {
  selectArticle,
  removeArticle,
  removeArticleStatusReset
};


export default connect(
  mapState,
  mapDispatch
)(DraftList);



