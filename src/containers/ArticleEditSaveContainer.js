import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { saveArticleContentToCurrentEdit } from "../ducks/currentEditing";
import { publishArticle, saveArticleAsDraft } from "../ducks/articles";

import { EditPageSaveOption } from '../components/header/EditSave';

const mapState = (state, ownProps) => (
  {
    id:  state.currentEditing.id,
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