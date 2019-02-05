import { CREATE_NEW_ARTICLE, SELECT_ARTICLE } from "./articles";

const currentEdit = (state='', action) => {
  switch (action.type) {
    case CREATE_NEW_ARTICLE:
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