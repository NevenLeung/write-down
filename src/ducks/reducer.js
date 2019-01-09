import { articles } from './articles';
import { drafts } from "./drafts";
import { currentEditing } from "./currentEditing";

const rootReducer = (state, action) => (
  {
    articles: articles(state, action),
    drafts: drafts(state, action),
    currentEditing: currentEditing(state, action)
  }
);

export default rootReducer;