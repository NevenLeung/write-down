const EDIT_DRAFT = 'write-down/currentEditing/EDIT_DRAFT';
const EDIT_ARTICLE = 'write-down/currentEditing/EDIT_ARTICLE';

const SAVE_ARTICLE_INFO_TO_CURRENT_EDIT = 'write-down/currentEditing/SAVE_ARTICLE_INFO_TO_CURRENT_EDIT';
const SAVE_ARTICLE_CONTENT_TO_CURRENT_EDIT = 'write-down/currentEditing/SAVE_ARTICLE_CONTENT_TO_CURRENT_EDIT';

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

const currentEditing = (state = {}, action) => {
  switch (action.type) {
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
  editDraft,
  editArticle,
  saveArticleInfoToCurrentEdit,
  saveArticleContentToCurrentEdit
};