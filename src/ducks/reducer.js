import { articles } from './articles';
import { user } from './user';
import { currentEdit } from "./currentEdit";

import { combineReducers } from 'redux';

const reducer = combineReducers({
  articles,
  currentEdit,
  user
});

export default reducer;