import {connect} from "react-redux";

import { selectArticle, removeArticle } from '../ducks/articles';

import ArticleList from '../components/article-list/ArticleList';

const selectThePublishedArticles = (list = []) => {
  return list.filter((article) => article.isPublished === true);
};

const mapState = (state) => (
  {
    articles: selectThePublishedArticles(state.articles.data),
    isFetching: state.articles.isFetching,
    isLoggedIn: state.user.isLoggedIn
  }
);

const mapDispatch = {
  selectArticle,
  removeArticle
};


export default connect(
  mapState,
  mapDispatch
)(ArticleList);



