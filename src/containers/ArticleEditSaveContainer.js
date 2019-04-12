import { connect } from "react-redux";

import { updateArticle, updateArticleStatusReset } from "../ducks/articles";
import { resetContentEditStatus } from "../ducks/currentEdit";
import { EditPageSaveOption } from '../components/header/EditSave';

import { generateTimeString } from "../utils/";

const mapState = (state, ownProps) => (
  {
    id: ownProps.id,
    markdown: ownProps.markdown,
    isUpdatingFinished: state.articles.isUpdatingFinished,
    updatedPart: state.articles.updatedPart,
    error: state.articles.error
  }
);

const mapDispatch = dispatch => ({
  resetContentEditStatus: () => dispatch(resetContentEditStatus()),
  saveArticleContent: (id, updatedData) =>
    dispatch(updateArticle(
      id,
      {
        ...updatedData,
        updatedAt: generateTimeString()
      },
      'content'
    )),
  publishArticle: (id) =>
    dispatch(updateArticle(
      id,
      {
        isPublished: true,
        postedAt: generateTimeString(),
        updatedAt: generateTimeString()
      }
    )),
  saveArticleAsDraft: (id) =>
    dispatch(updateArticle(
      id,
      {
        isPublished: false
      }
    )),
  updateArticleStatusReset: () => dispatch(updateArticleStatusReset())
});

const ArticleEditSaveContainer = connect(
  mapState,
  mapDispatch
)(EditPageSaveOption);

export {
  ArticleEditSaveContainer,
};