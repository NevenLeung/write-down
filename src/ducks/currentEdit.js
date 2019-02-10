import { CREATE_ARTICLE_SUCCESS, SELECT_ARTICLE } from "./articles";

const currentEdit = (state='', action) => {
  switch (action.type) {
    case CREATE_ARTICLE_SUCCESS:
      return action.id;
    case SELECT_ARTICLE:
      return action.id;
    default:
      return state;
  }
};

export {
  currentEdit
};