import { connect } from "react-redux";

import { saveArticleContentToCurrentEdit } from "../ducks/currentEditing";
import { publishArticle, deleteArticle  } from "../ducks/articles";
import { saveArticleAsDraft, deleteArticleFromDraft  } from "../ducks/drafts";

import { EditPageSaveOption } from '../components/header/EditSave';

const mapState = (state, ownProps) => (
  {
    id:  state.currentEditing.id,
    markdown: ownProps.markdown
  }
);

const mapDispatch = {
  saveArticleContentToCurrentEdit,
  publishArticle,
  deleteArticle,
  saveArticleAsDraft,
  deleteArticleFromDraft
};

const ArticleEditSaveContainer = connect(
  mapState,
  mapDispatch
)(EditPageSaveOption);

export {
  ArticleEditSaveContainer,
};