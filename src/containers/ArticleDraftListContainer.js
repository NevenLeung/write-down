import {connect} from "react-redux";
import { bindActionCreators } from "redux";

import { createArticleInDraft, deleteArticleFromDraft } from '../ducks/draft';
import { editDraft } from "../ducks/currentEditing";

import DraftList from '../components/ArticleDraftList';

const mapState = (state) => (
  {
    draft: state.draft
  }
);

const mapDispatch = (dispatch) => (
  bindActionCreators({
    createArticleInDraft,
    editDraft,
    deleteArticleFromDraft
  }, dispatch)
);


export default connect(
  mapState,
  mapDispatch
)(DraftList);



