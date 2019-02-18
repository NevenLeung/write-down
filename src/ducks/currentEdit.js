import { CREATE_ARTICLE_SUCCESS, SELECT_ARTICLE } from "./articles";

const UPDATE_CONTENT_EDIT_STATUS = 'write-down/currentEdit/UPDATE_CONTENT_EDIT_STATUS';

const updateContentEditStatus = () => (
  {
    type: UPDATE_CONTENT_EDIT_STATUS
  }
);

const RESET_CONTENT_EDIT_STATUS = 'write-down/currentEdit/RESET_CONTENT_EDIT_STATUS';

const resetContentEditStatus = () => (
  {
    type: RESET_CONTENT_EDIT_STATUS
  }
);

const currentEdit = (
  state={
    id: '',
    isTouch: false
  },
  action
) => {
  switch (action.type) {
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        id: action.id
      };
    case SELECT_ARTICLE:
      return {
        ...state,
        id: action.id,
        isTouch: false
      };
    case UPDATE_CONTENT_EDIT_STATUS:
      return {
        ...state,
        isTouch: true
      };
    case RESET_CONTENT_EDIT_STATUS:
      return {
        ...state,
        isTouch: false
      };
    default:
      return state;
  }
};

export {
  currentEdit,
  updateContentEditStatus,
  resetContentEditStatus
};