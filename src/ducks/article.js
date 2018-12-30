import uuid from 'uuid';

const CREATE_ARTICLE = 'write-down/article/CREATE_ARTICLE';
const DELETE_ARTICLE = 'write-down/article/DELETE_ARTICLE';

const EDIT_ARTICLE = 'write-down/article/EDIT_ARTICLE';

const SAVE_ARTICLE_INFO_TO_CURRENT_EDIT = 'write-down/article/SAVE_ARTICLE_INFO_TO_CURRENT_EDIT';
const SAVE_ARTICLE_CONTENT_TO_CURRENT_EDIT = 'write-down/article/SAVE_ARTICLE_CONTENT_TO_CURRENT_EDIT';

const PUBLISH_ARTICLE = 'write-down/article/PUBLISH_ARTICLE';
const SAVE_ARTICLE_AS_DRAFT = 'write-down/article/SAVE_ARTICLE_AS_DRAFT';

const createArticle = () => (
  {
    type: CREATE_ARTICLE
  }
);

const editArticle = (id) => (
  {
    type: EDIT_ARTICLE,
    id
  }
);

const publishArticle = (id) => (
  {
    type: PUBLISH_ARTICLE,
    id
  }
);

const saveArticleAsDraft = (id) => (
  {
    type: SAVE_ARTICLE_AS_DRAFT,
    id
  }
);

const deleteArticle = (id) => (
  {
    type: DELETE_ARTICLE,
    id
  }
);

const saveArticleInfoToCurrentEdit = (title, excerpt, coverUrl) => (
  {
    type: SAVE_ARTICLE_INFO_TO_CURRENT_EDIT,
    title,
    excerpt,
    coverUrl
  }
);

const saveArticleContentToCurrentEdit = (markdown) => (
  {
    type: SAVE_ARTICLE_CONTENT_TO_CURRENT_EDIT,
    markdown
  }
);

const articles = (
  state={
    data: [],
    currentEditing: {}
  },
  action
) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      return {
        data: [
          ...state.data,
          article(undefined, action)
        ]
      };
    case EDIT_ARTICLE:
      return {
        data: state.data,
        currentEditing: {
          ...getArticleWithID(state.data, action)
        }
      };
    case SAVE_ARTICLE_INFO_TO_CURRENT_EDIT:
      return {
        data: state.data,
        currentEditing: {
          ...state.currentEditing,
          ...article(undefined, action)
        }
      };
    case SAVE_ARTICLE_CONTENT_TO_CURRENT_EDIT:
      return {
        data: state.data,
        currentEditing: {
          ...state.currentEditing,
          ...article(undefined, action)
        }
      };
    case SAVE_ARTICLE_AS_DRAFT:
      return {

      };
    case PUBLISH_ARTICLE:
      return {
        data: [
          state.currentEditing,
          ...removeArticleWithID(state.data, action)
        ],
        currentEditing: state.currentEditing
      };
    case DELETE_ARTICLE:
      return {
        data: removeArticleWithID(state.data, action)
      };
    default:
      return state
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
    case SAVE_ARTICLE_INFO_TO_CURRENT_EDIT:
      return {
        title: action.title,
        excerpt: action.excerpt,
        coverUrl: action.coverUrl,
        author: 'Author'
      };
    case SAVE_ARTICLE_CONTENT_TO_CURRENT_EDIT:
      return {
        markdown: action.markdown
      };

    default:
      return state;
  }
};

const getArticleWithID = (list, action) => {
  const result = list.filter(article => article.id === action.id);

  return result.length? result[0]: {};
};

const removeArticleWithID = (list, action) => {
  return list.filter(article => article.id !== action.id);
};


export {
  articles,
  createArticle,
  editArticle,
  publishArticle,
  saveArticleAsDraft,
  deleteArticle,
  saveArticleInfoToCurrentEdit,
  saveArticleContentToCurrentEdit,
}