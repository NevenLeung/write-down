import { connect } from "react-redux";

import { saveArticleContent } from "../ducks/articles";
import { publishArticle, saveArticleAsDraft  } from "../ducks/articles";

import { EditPageSaveOption } from '../components/header/EditSave';

const mapState = (state, ownProps) => (
  {
    id: ownProps.id,
    markdown: ownProps.markdown
  }
);

const mapDispatch = {
  saveArticleContent,
  publishArticle,
  saveArticleAsDraft,
};

const ArticleEditSaveContainer = connect(
  mapState,
  mapDispatch
)(EditPageSaveOption);

export {
  ArticleEditSaveContainer,
};