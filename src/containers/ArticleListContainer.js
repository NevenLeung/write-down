import {connect} from "react-redux";

import { deleteArticle } from '../ducks/articles';

import ArticleList from '../components/article-list/ArticleList';

const selectThePublishedArticles = (list = []) => {
  return list.filter((article) => article.isPublished === true);
};

const mapState = (state) => (
  {
    articles: selectThePublishedArticles(state.articles)
  }
);

const mapDispatch = {
  deleteArticle
};


export default connect(
  mapState,
  mapDispatch
)(ArticleList);



