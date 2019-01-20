import {connect} from "react-redux";

import { deleteArticle } from '../ducks/articles';
import { editArticle } from "../ducks/currentEditing";

import ArticleList from '../components/article-list/ArticleList';

const mapState = (state) => (
  {
    articles: state.articles
  }
);

const mapDispatch = {
  editArticle,
  deleteArticle
};


export default connect(
  mapState,
  mapDispatch
)(ArticleList);



