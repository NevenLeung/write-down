import {connect} from "react-redux";
import { bindActionCreators } from "redux";

import { deleteArticleFromDraft } from '../ducks/drafts';
import { editDraft } from "../ducks/currentEditing";

import DraftList from '../components/ArticleDraftList';

const mapState = (state) => (
  {
    drafts: state.drafts
  }
);

const mapDispatch = (dispatch) => (
  bindActionCreators({
    editDraft,
    deleteArticleFromDraft
  }, dispatch)
);


export default connect(
  mapState,
  mapDispatch
)(DraftList);



