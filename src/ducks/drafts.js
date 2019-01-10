const DELETE_ARTICLE_FROM_DRAFT = 'write-down/draft/DELETE_ARTICLE_FROM_DRAFT';
const SAVE_ARTICLE_AS_DRAFT = 'write-down/draft/SAVE_ARTICLE_AS_DRAFT';

const saveArticleAsDraft = (id) => (
  {
    type: SAVE_ARTICLE_AS_DRAFT,
    id
  }
);

const deleteArticleFromDraft = (id) => (
  {
    type: DELETE_ARTICLE_FROM_DRAFT,
    id
  }
);

const drafts = (state={drafts: []}, action) => {
  switch (action.type) {
    case SAVE_ARTICLE_AS_DRAFT:
      return updateArticle(state, action);
    case DELETE_ARTICLE_FROM_DRAFT:
      return removeArticle(state.drafts, action);
    default:
      return state.drafts
  }
};

const updateArticle = (state, action) => {
  let articleIsExisted = false;
  
  const result = state.drafts.map(article => {
    // 用currentEditing替换相应id的article item完成更新
    if (article.id === action.id) {
      articleIsExisted = true;
      article = state.currentEditing;
    }

    return article;
  });

  if (!articleIsExisted) {
    return [
      state.currentEditing,
      ...state.drafts
    ];
  } else {
    return result;
  }
};

const removeArticle = (list = [], action) => {
  // 从draft中删除相应id的article item
  return list.filter(article => article.id !== action.id);
};

export {
  drafts,
  saveArticleAsDraft,
  deleteArticleFromDraft,
}