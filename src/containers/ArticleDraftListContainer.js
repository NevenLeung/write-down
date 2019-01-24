import {connect} from "react-redux";

import { deleteArticle } from '../ducks/articles';

import DraftList from '../components/article-list/ArticleDraftList';

const selectTheDraftArticles = (list = []) => {
  return list.filter((article) => article.isPublished === false);
};


const mapState = (state) => (
  {
    drafts: selectTheDraftArticles(state.articles)
  }
);

const mapDispatch = {
  deleteArticle
};


export default connect(
  mapState,
  mapDispatch
)(DraftList);



