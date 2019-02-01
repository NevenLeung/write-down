import shortid from 'shortid';

const CREATE_NEW_ARTICLE = 'write-down/articles/CREATE_NEW_ARTICLE';
const EDIT_ARTICLE = 'write-down/articles/EDIT_ARTICLE';

const SAVE_ARTICLE_INFO = 'write-down/articles/SAVE_ARTICLE_INFO';
const SAVE_ARTICLE_CONTENT = 'write-down/articles/SAVE_ARTICLE_CONTENT';

const DELETE_ARTICLE = 'write-down/articles/DELETE_ARTICLE';

const PUBLISH_ARTICLE = 'write-down/articles/PUBLISH_ARTICLE';
const SAVE_ARTICLE_AS_DRAFT = 'write-down/articles/SAVE_ARTICLE_AS_DRAFT';

const newArticle = {
  id: shortid.generate(),
  title: 'Title',
  excerpt: 'Here is the excerpt.',
  tags: [],
  cover: {},
  author: 'Author',
  markdown: '',
  htmlOutput: '',
  isPublished: false,
  postedAt: Date.now(),
  updatedAt: Date.now()
};

const createNewArticle = () => (
  {
    type: CREATE_NEW_ARTICLE,
    ...newArticle
  }
);

// For the use of saving current editing article id to 'state.currentEdit'
const editArticle = (id) => (
  {
    type: EDIT_ARTICLE,
    id
  }
);

const saveArticleInfo = (id, title, excerpt, tags, author, cover) => (
  {
    type: SAVE_ARTICLE_INFO,
    id,
    title,
    excerpt,
    author,
    tags,
    cover,
    updatedAt: Date.now()
  }
);

const saveArticleContent = (id, markdown) => (
  {
    type: SAVE_ARTICLE_CONTENT,
    id,
    markdown,
    updatedAt: Date.now()
  }
);

const publishArticle = (id) => (
  {
    type: PUBLISH_ARTICLE,
    id,
    updatedAt: Date.now(),
    postedAt: Date.now()
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

const articles = (state=[], action) => {
  switch (action.type) {
    case CREATE_NEW_ARTICLE:
      return article(state, action);
    case SAVE_ARTICLE_INFO:
      return article(state, action);
    case SAVE_ARTICLE_CONTENT:
      return article(state, action);
    case PUBLISH_ARTICLE:
      return article(state, action);
    case SAVE_ARTICLE_AS_DRAFT:
      return article(state, action);
    case DELETE_ARTICLE:
      return article(state, action);
    default:
      return state;
  }
};

const article = (state, action) => {
  switch (action.type) {
    case CREATE_NEW_ARTICLE: {
      const { id, title, excerpt, tags, author, cover, markdown, htmlOutput, isPublished, updatedAt, postedAt } = action;

      return [
        {
          id,
          title,
          excerpt,
          tags,
          cover,
          author,
          markdown,
          htmlOutput,
          isPublished,
          postedAt,
          updatedAt
        },
        ...state
      ];
    }

    case SAVE_ARTICLE_INFO: {
      const { id, title, excerpt, tags, author, cover, updatedAt } = action;

      return state.map(article => {
        if (article.id === id) {
          return {
            ...article,
            title,
            excerpt,
            author,
            tags,
            cover,
            updatedAt
          };
        }

        return article;
      });
    }

    case SAVE_ARTICLE_CONTENT: {
      const { id, markdown, updatedAt } = action;

      return state.map(article => {
        if (article.id === id) {
          return {
            ...article,
            markdown,
            updatedAt
          };
        }

        return article;
      });
    }

    case SAVE_ARTICLE_AS_DRAFT:
      return state.map(article => {
        if (article.id === action.id && article.isPublished === true) {
          console.log('match draft');

          return {
            ...article,
            isPublished: false
          };
        }

        return article;
      });

    case PUBLISH_ARTICLE:
      return state.map(article => {
        if (article.id === action.id && article.isPublished === false) {
          return {
            ...article,
            isPublished: true,
            postedAt: action.postedAt,
            updatedAt: action.updatedAt
          };
        }

        return article;
      });

    case DELETE_ARTICLE:
      return state.filter(article => article.id !== action.id);

    default:
      return state;
  }
};

export {
  articles,
  createNewArticle,
  editArticle,
  saveArticleInfo,
  saveArticleContent,
  publishArticle,
  saveArticleAsDraft,
  deleteArticle,
  CREATE_NEW_ARTICLE,
  EDIT_ARTICLE
}