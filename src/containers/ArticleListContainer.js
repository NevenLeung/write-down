import {connect} from "react-redux";

import { selectArticle, deleteArticle } from '../ducks/articles';

import ArticleList from '../components/article-list/ArticleList';

const selectThePublishedArticles = (list = []) => {
  return list.filter((article) => article.isPublished === true);
};

const mapState = (state) => (
  {
    articles: selectThePublishedArticles(state.articles),
    isLoggedIn: state.user.isLoggedIn
  }
);

const mapDispatch = {
  selectArticle,
  deleteArticle
};


export default connect(
  mapState,
  mapDispatch
)(ArticleList);



