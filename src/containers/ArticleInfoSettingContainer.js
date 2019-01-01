import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { saveArticleInfoToCurrentEdit } from "../ducks/currentEditing";

import { InfoSettingPreview } from '../components/article-edit/ArticleInfoSettingPreview';
import { WrappedFormInModal } from "../components/article-edit/ArticleInfoSettingForm";

const mapState = (state) => {
  const articleData = state.currentEditing;

  if (articleData && Object.keys(articleData).length !== 0) {
    return {
      title: articleData.title,
      excerpt: articleData.excerpt,
      coverUrl: articleData.coverUrl
    };
  }

  return {};
};

const mapDispatch = (dispatch) => (
  bindActionCreators({
    saveArticleInfoToCurrentEdit
  }, dispatch)
);

const InfoSettingFormContainer = connect(
  mapState,
  mapDispatch
)(WrappedFormInModal);

const InfoSettingPreviewContainer = connect(
  mapState,
  null
)(InfoSettingPreview);

export {
  InfoSettingFormContainer,
  InfoSettingPreviewContainer
};