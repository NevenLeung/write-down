import { articles } from './articles';
import { draft } from "./draft";
import { currentEditing } from "./currentEditing";

const rootReducer = (state, action) => (
  {
    articles: articles(state, action),
    draft: draft(state, action),
    currentEditing: currentEditing(state, action)
  }
);

export default rootReducer;