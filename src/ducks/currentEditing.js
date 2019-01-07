import uuid from 'uuid';

const CREATE_NEW_ARTICLE = 'write-down/currentEditing/CREATE_NEW_ARTICLE';

const EDIT_DRAFT = 'write-down/currentEditing/EDIT_DRAFT';
const EDIT_ARTICLE = 'write-down/currentEditing/EDIT_ARTICLE';

const SAVE_ARTICLE_INFO_TO_CURRENT_EDIT = 'write-down/currentEditing/SAVE_ARTICLE_INFO_TO_CURRENT_EDIT';
const SAVE_ARTICLE_CONTENT_TO_CURRENT_EDIT = 'write-down/currentEditing/SAVE_ARTICLE_CONTENT_TO_CURRENT_EDIT';

const createNewArticle = () => (
  {
    type: CREATE_NEW_ARTICLE
  }
);

const editDraft = (id) => (
  {
    type: EDIT_DRAFT,
    id
  }
);

const editArticle = (id) => (
  {
    type: EDIT_ARTICLE,
    id
  }
);

const saveArticleInfoToCurrentEdit = (title, excerpt, tags, coverUrl) => (
  {
    type: SAVE_ARTICLE_INFO_TO_CURRENT_EDIT,
    title,
    excerpt,
    tags,
    coverUrl
  }
);

const saveArticleContentToCurrentEdit = (markdown) => (
  {
    type: SAVE_ARTICLE_CONTENT_TO_CURRENT_EDIT,
    markdown
  }
);

const newArticle = {
  id: uuid.v4(),
  title: 'Title',
  excerpt: 'Here is the excerpt.',
  tags: [],
  coverUrl: '',
  author: 'Author'
};

const currentEditing = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NEW_ARTICLE:
      return newArticle;
    case EDIT_ARTICLE:
      return {
        ...getArticle(state.articles, action)
      };
    case EDIT_DRAFT:
      return {
        ...getArticle(state.draft, action)
      };
    case SAVE_ARTICLE_INFO_TO_CURRENT_EDIT:
      return {
        ...state.currentEditing,
        title: action.title,
        excerpt: action.excerpt,
        tags: action.tags,
        coverUrl: action.coverUrl,
        author: 'Author'
      };
    case SAVE_ARTICLE_CONTENT_TO_CURRENT_EDIT:
      return {
        ...state.currentEditing,
        markdown: action.markdown
      };
    default:
      return state.currentEditing;
  }
};

const getArticle= (list, action) => {
  const result = list.filter(article => article.id === action.id);

  return result.length? result[0]: {};
};

export {
  currentEditing,
  createNewArticle,
  editDraft,
  editArticle,
  saveArticleInfoToCurrentEdit,
  saveArticleContentToCurrentEdit
};