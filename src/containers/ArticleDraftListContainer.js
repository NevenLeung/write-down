import {connect} from "react-redux";

import { editArticle, deleteArticle } from '../ducks/articles';

import DraftList from '../components/article-list/ArticleDraftList';

const selectTheDraftArticles = (list = []) => {
  return list.filter((article) => article.isPublished === false);
};


const mapState = (state) => (
  {
    drafts: selectTheDraftArticles(state.articles),
    isLoggedIn: state.user.isLoggedIn
  }
);

const mapDispatch = {
  editArticle,
  deleteArticle
};


export default connect(
  mapState,
  mapDispatch
)(DraftList);



