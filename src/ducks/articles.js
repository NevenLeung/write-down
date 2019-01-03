import uuid from 'uuid';

const CREATE_ARTICLE = 'write-down/articles/CREATE_ARTICLE';
const DELETE_ARTICLE = 'write-down/articles/DELETE_ARTICLE';

const PUBLISH_ARTICLE = 'write-down/articles/PUBLISH_ARTICLE';

const createArticle = () => (
  {
    type: CREATE_ARTICLE
  }
);

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
    case CREATE_ARTICLE:
      return [
        ...state.articles,
        article(undefined, action)
      ];
    case PUBLISH_ARTICLE:
      return updateArticle(state, action);
    case DELETE_ARTICLE:
      return removeArticle(state.articles, action);
    default:
      return state.articles
  }
};

const article = (state={}, action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      return {
        id: uuid.v4(),
        title: 'Title',
        excerpt: 'Here is the excerpt',
        author: 'Author'
      };
    default:
      return state;
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
  createArticle,
  publishArticle,
  deleteArticle,
}