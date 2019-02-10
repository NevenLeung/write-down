import { connect } from "react-redux";

import { createArticle } from "../ducks/articles";
import { userLogout } from "../ducks/user";

import { UserNavMenu } from "../components/header/UserNavMenu";

const mapState = (state) => (
  {
    isLoggedIn: state.user.isLoggedIn
  }
);

const mapDispatch = {
  createArticle,
  userLogout
};

export default connect(
  mapState,
  mapDispatch
)(UserNavMenu);



