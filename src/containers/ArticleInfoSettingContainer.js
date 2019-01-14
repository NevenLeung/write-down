import { connect } from "react-redux";

import { saveArticleInfoToCurrentEdit } from "../ducks/currentEditing";

import { InfoSettingPreview } from '../components/article-edit/ArticleInfoSettingPreview';
import { WrappedFormInModal } from "../components/article-edit/ArticleInfoSettingForm";

const mapState = (state) => {
  const articleData = state.currentEditing;

  if (articleData && Object.keys(articleData).length !== 0) {
    return {
      title: articleData.title,
      excerpt: articleData.excerpt,
      tags: articleData.tags,
      coverUrl: articleData.cover.url
    };
  }

  return {};
};

const mapDispatch = {
  saveArticleInfoToCurrentEdit
};

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