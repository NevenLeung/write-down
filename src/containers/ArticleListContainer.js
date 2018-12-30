import {connect} from "react-redux";
import { bindActionCreators } from "redux";

import { createArticle, editArticle, deleteArticle } from '../ducks/article';

import ArticleList from '../components/ArticleList';

const mapState = (state) => (
  {
    articles: state.articles.data
  }
);

const mapDispatch = (dispatch) => (
  bindActionCreators({
      createArticle,
      editArticle,
      deleteArticle
    }, dispatch)
);


export default connect(
  mapState,
  mapDispatch
)(ArticleList);



