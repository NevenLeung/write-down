import { articles as articlesReducer } from './articles';
// import { drafts } from "./drafts";
// import { currentEditing } from "./currentEditing";

const rootReducer = (state, action) => (
  {
    articles: articlesReducer(state.articles, action),
    // drafts: drafts(state, action),
    // currentEditing: currentEditing(state, action)
  }
);

export default rootReducer;