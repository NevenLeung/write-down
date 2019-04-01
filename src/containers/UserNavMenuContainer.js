import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createArticle, createArticleStatusReset } from "../ducks/articles";
import { userLogout } from "../ducks/user";

import { UserNavMenu } from "../components/header/UserNavMenu";

const mapState = (state) => (
  {
    isLoggedIn: state.user.isLoggedIn,
    isCreatingFinished: state.articles.isCreatingFinished,
    error: state.articles.error
  }
);

const mapDispatch = {
  createArticle,
  createArticleStatusReset,
  userLogout
};

export default withRouter(connect(
  mapState,
  mapDispatch
)(UserNavMenu));



