import {connect} from "react-redux";
import { bindActionCreators } from "redux";

import { deleteArticle } from '../ducks/articles';
import { editArticle } from "../ducks/currentEditing";

import ArticleList from '../components/ArticleList';

const mapState = (state) => (
  {
    articles: state.articles
  }
);

const mapDispatch = (dispatch) => (
  bindActionCreators({
    editArticle,
    deleteArticle
  }, dispatch)
);


export default connect(
  mapState,
  mapDispatch
)(ArticleList);



