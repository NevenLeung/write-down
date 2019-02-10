import shortid from 'shortid';
import { db, createDoc, removeDoc, updateDoc, getDocsByType, loadArticles } from "../api/pouchdb";

const FETCH_ARTICLES_REQUEST = 'write-down/articles/FETCH_ARTICLES_REQUEST';

const fetchArticlesRequest = () => (
  {
    type: FETCH_ARTICLES_REQUEST
  }
);

const FETCH_ARTICLES_SUCCESS = 'write-down/articles/FETCH_ARTICLES_SUCCESS';

const fetchArticlesSuccess = (articles) => (
  {
    type: FETCH_ARTICLES_SUCCESS,
    articles
  }
);

const FETCH_ARTICLES_FAILURE = 'write-down/articles/FETCH_ARTICLES_FAILURE';

const fetchArticlesFailure = (error) => (
  {
    type: FETCH_ARTICLES_FAILURE,
    error
  }
);

const fetchArticles = () => async (dispatch) => {
  dispatch(fetchArticlesRequest());

  let res = undefined;

  try {
    res = await loadArticles();

    if (typeof res === "object" && 'docs' in res && res.docs.length !== 0) {
      dispatch(fetchArticlesSuccess(res.docs));
    } else {
      dispatch(fetchArticlesFailure('No articles in database.'));
    }
  } catch (error) {
    dispatch(fetchArticlesFailure(error));
  }

  return res;
};

const generateNewArticle = () => (
  {
    id: shortid.generate(),
    title: 'Title',
    excerpt: 'Here is the excerpt.',
    tags: [],
    cover: {},
    author: 'Author',
    markdown: '',
    htmlOutput: '',
    isPublished: false,
    postedAt: new Date().toJSON(),
    updatedAt: new Date().toJSON()
  }
);

const CREATE_ARTICLE_REQUEST = 'write-down/articles/CREATE_ARTICLE_REQUEST';

const createArticleRequest = () => (
  {
    type: CREATE_ARTICLE_REQUEST
  }
);

const CREATE_ARTICLE_SUCCESS = 'write-down/articles/CREATE_ARTICLE_SUCCESS';

const createArticleSuccess = (id, articles) => (
  {
    type: CREATE_ARTICLE_SUCCESS,
    id,
    articles
  }
);

const CREATE_ARTICLE_FAILURE = 'write-down/articles/CREATE_ARTICLE_FAILURE';

const createArticleFailure = (error) => (
  {
    type: CREATE_ARTICLE_FAILURE,
    error
  }
);

const createArticle = () => async (dispatch) => {
  dispatch(createArticleRequest());

  let doc = undefined;

  try {
    const newArticle = generateNewArticle();

    doc = await createDoc(db, {
      ...newArticle,
      _id: 'article_' + newArticle.id
    });

    if (typeof doc !== 'undefined') {
      const data = await getDocsByType(db, 'article');

      if (typeof data === "object" && 'docs' in data && data.docs.length !== 0) {
        // Store all the articles after creating a new article.
        // Store the article id for the state.currentEdit to use.
        dispatch(createArticleSuccess(doc.id, data.docs));
      }
    } else {
      dispatch(createArticleFailure('It is failed to create article.'))
    }
  } catch (error) {
    dispatch(createArticleFailure(error));
  }

  return doc;
};

const SELECT_ARTICLE = 'write-down/articles/SELECT_ARTICLE';

// For the use of saving the id of current editing article to 'state.currentEdit'
const selectArticle = (id) => (
  {
    type: SELECT_ARTICLE,
    id
  }
);

const UPDATE_ARTICLE_REQUEST = 'write-down/articles/UPDATE_ARTICLE_REQUEST';

const updateArticleRequest = () => (
  {
    type: UPDATE_ARTICLE_REQUEST
  }
);

const UPDATE_ARTICLE_SUCCESS = 'write-down/articles/UPDATE_ARTICLE_SUCCESS';

const updateArticleSuccess = (articles) => (
  {
    type: UPDATE_ARTICLE_SUCCESS,
    articles
  }
);

const UPDATE_ARTICLE_FAILURE = 'write-down/articles/UPDATE_ARTICLE_FAILURE';

const updateArticleFailure = (error) => (
  {
    type: UPDATE_ARTICLE_FAILURE,
    error
  }
);

const updateArticle = (id, updatedData) => async (dispatch) => {
  dispatch(updateArticleRequest());

  let res = undefined;

  try {
    await updateDoc(db, 'article_' + id, updatedData);
    res = await getDocsByType(db, 'article');

    if (typeof res === "object" && 'docs' in res && res.docs.length !== 0) {
      dispatch(updateArticleSuccess(res.docs));
    } else {
      dispatch(updateArticleFailure('It is failed to update article_' + id));
    }
  } catch (error) {
    dispatch(updateArticleFailure(error));
  }

  return res;
};

const REMOVE_ARTICLE_REQUEST = 'write-down/articles/REMOVE_ARTICLE_REQUEST';

const removeArticleRequest = () => (
  {
    type: REMOVE_ARTICLE_REQUEST
  }
);

const REMOVE_ARTICLE_SUCCESS = 'write-down/articles/REMOVE_ARTICLE_SUCCESS';

const removeArticleSuccess = (articles) => (
  {
    type: REMOVE_ARTICLE_SUCCESS,
    articles
  }
);

const REMOVE_ARTICLE_FAILURE = 'write-down/articles/REMOVE_ARTICLE_FAILURE';

const removeArticleFailure = (error) => (
  {
    type: REMOVE_ARTICLE_FAILURE,
    error
  }
);

const removeArticle = (id) => async (dispatch) => {
  dispatch(removeArticleRequest());

  let res = undefined;

  try {
    await removeDoc(db, 'article_' + id);
    res = await getDocsByType(db, 'article');

    if (typeof res === "object" && 'docs' in res && res.docs.length !== 0) {
      dispatch(removeArticleSuccess(res.docs));
    } else {
      dispatch(removeArticleFailure('It is failed to remove article_' + id));
    }
  } catch (error) {
    dispatch(removeArticleFailure(error));
  }

  return res;
};

const articles = (
  state={
    isCreating: false,
    isFetching: false,
    isInserting: false,
    isUpdating: false,
    isRemoving: false,
    data: [],
    error: ''
  },
  action
) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        data: action.articles
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case CREATE_ARTICLE_REQUEST:
      return {
        ...state,
        isCreating: true
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        isCreating: false,
        error: '',
        data: action.articles
      };
    case CREATE_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case UPDATE_ARTICLE_REQUEST:
      return {
        ...state,
        isUpdating: true
      };
    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        error: '',
        data: action.articles
      };
    case UPDATE_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case REMOVE_ARTICLE_REQUEST:
      return {
        ...state,
        isRemoving: true
      };
    case REMOVE_ARTICLE_SUCCESS:
      return {
        ...state,
        isRemoving: false,
        error: '',
        data: action.articles
      };
    case REMOVE_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export {
  articles,
  createArticle,
  fetchArticles,
  selectArticle,
  updateArticle,
  removeArticle,
  CREATE_ARTICLE_SUCCESS,
  SELECT_ARTICLE
}