import { articles } from './articles';
import { currentEditing } from "./currentEditing";

const rootReducer = (state, action) => (
  {
    articles: articles(state, action),
    currentEditing: currentEditing(state, action)
  }
);

export default rootReducer;