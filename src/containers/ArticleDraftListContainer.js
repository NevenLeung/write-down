import {connect} from "react-redux";

import { selectArticle, removeArticle } from '../ducks/articles';

import DraftList from '../components/article-list/ArticleDraftList';

const selectTheDraftArticles = (list = []) => {
  return list.filter((article) => article.isPublished === false);
};


const mapState = (state) => (
  {
    drafts: selectTheDraftArticles(state.articles.data),
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
)(DraftList);



