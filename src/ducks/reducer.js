import { articles as articlesReducer } from './articles';
import { user as userReducer } from './user';
import { currentEdit as currentEditReducer } from "./currentEdit";

const rootReducer = (state, action) => (
  {
    articles: articlesReducer(state.articles, action),
    currentEdit: currentEditReducer(state.currentEdit, action),
    user: userReducer(state.user, action),
  }
);

export default rootReducer;