import { articles as articlesReducer } from './articles';
import { user as userReducer } from './user';

const rootReducer = (state, action) => (
  {
    articles: articlesReducer(state.articles, action),
    user: userReducer(state.user, action)
  }
);

export default rootReducer;