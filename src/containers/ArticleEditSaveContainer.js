import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { saveArticleContentToCurrentEdit, publishArticle, saveArticleAsDraft } from "../ducks/article";

import { EditPageSaveOption } from '../components/header/EditSave';

const mapState = (state, ownProps) => (
  {
    id:  state.articles.currentEditing.id,
    markdown: ownProps.markdown
  }
);

const mapDispatch = (dispatch) => (
  bindActionCreators({
    saveArticleContentToCurrentEdit,
    publishArticle,
    saveArticleAsDraft
  }, dispatch)
);

const ArticleEditSaveContainer = connect(
  mapState,
  mapDispatch
)(EditPageSaveOption);

export {
  ArticleEditSaveContainer,
};