import {connect} from "react-redux";

import { deleteArticleFromDraft } from '../ducks/drafts';
import { editDraft } from "../ducks/currentEditing";

import DraftList from '../components/article-list/ArticleDraftList';

const mapState = (state) => (
  {
    drafts: state.drafts
  }
);

const mapDispatch = {
  editDraft,
  deleteArticleFromDraft
};


export default connect(
  mapState,
  mapDispatch
)(DraftList);



