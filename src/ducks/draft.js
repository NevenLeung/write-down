import uuid from 'uuid';

const CREATE_ARTICLE_IN_DRAFT = 'write-down/draft/CREATE_ARTICLE_IN_DRAFT';
const DELETE_ARTICLE_FROM_DRAFT = 'write-down/draft/DELETE_ARTICLE_FROM_DRAFT';

const SAVE_ARTICLE_AS_DRAFT = 'write-down/draft/SAVE_ARTICLE_AS_DRAFT';

const createArticleInDraft = () => (
  {
    type: CREATE_ARTICLE_IN_DRAFT
  }
);

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

const draft = (state={draft: []}, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_IN_DRAFT:
      return [
        ...state.draft,
        {
          id: uuid.v4(),
          title: 'Title',
          excerpt: 'Here is the excerpt',
          author: 'Author'
        }
      ];
    case SAVE_ARTICLE_AS_DRAFT:
      return updateArticle(state, action);
    case DELETE_ARTICLE_FROM_DRAFT:
      return removeArticle(state.draft, action);
    default:
      return state.draft
  }
};

const updateArticle = (state, action) => {
  let articleIsExisted = false;

  const result = state.draft.map(article => {
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
      ...state.draft
    ];
  } else {
    return result;
  }
};

const removeArticle = (list, action) => {
  // 从draft中删除相应id的article item
  return list.filter(article => article.id !== action.id);
};

export {
  draft,
  createArticleInDraft,
  saveArticleAsDraft,
  deleteArticleFromDraft,
}