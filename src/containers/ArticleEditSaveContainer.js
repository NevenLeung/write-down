import { connect } from "react-redux";

import { updateArticle } from "../ducks/articles";
import { EditPageSaveOption } from '../components/header/EditSave';

import { generateTimeString } from "../utils/";

const mapState = (state, ownProps) => (
  {
    id: ownProps.id,
    markdown: ownProps.markdown
  }
);

const mapDispatch = dispatch => ({
  saveArticleContent: (id, updatedData) =>
    dispatch(updateArticle(id, {
      ...updatedData,
      updatedAt: generateTimeString()
    })),
  publishArticle: (id) =>
    dispatch(updateArticle(id, {
      isPublished: true,
      postedAt: generateTimeString(),
      updatedAt: generateTimeString()
    })),
  saveArticleAsDraft: (id) =>
    dispatch(updateArticle(id, {
      isPublished: false
    })),
});

const ArticleEditSaveContainer = connect(
  mapState,
  mapDispatch
)(EditPageSaveOption);

export {
  ArticleEditSaveContainer,
};