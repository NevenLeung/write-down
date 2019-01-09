const DELETE_ARTICLE = 'write-down/articles/DELETE_ARTICLE';

const PUBLISH_ARTICLE = 'write-down/articles/PUBLISH_ARTICLE';

const publishArticle = (id) => (
  {
    type: PUBLISH_ARTICLE,
    id
  }
);

const deleteArticle = (id) => (
  {
    type: DELETE_ARTICLE,
    id
  }
);

const articles = (state={articles: []}, action) => {
  switch (action.type) {
    case PUBLISH_ARTICLE:
      return updateArticle(state, action);
    case DELETE_ARTICLE:
      return removeArticle(state.articles, action);
    default:
      return state.articles
  }
};

const updateArticle = (state, action) => {
  let articleIsExisted = false;

  const result = state.articles.map(article => {
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
      ...state.articles
    ];
  } else {
    return result;
  }
};

const removeArticle = (list, action) => {
  // 从articles中删除相应id的article item
  return list.filter(article => article.id !== action.id);
};

export {
  articles,
  publishArticle,
  deleteArticle,
}