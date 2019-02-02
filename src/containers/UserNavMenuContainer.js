import {connect} from "react-redux";

import { createNewArticle } from "../ducks/articles";
import { userLogout } from "../ducks/user";

import { UserNavMenu } from "../components/header/UserNavMenu";

const mapState = (state) => (
  {
    isLoggedIn: state.user.isLoggedIn
  }
);

const mapDispatch = {
  createNewArticle,
  userLogout
};

export default connect(
  mapState,
  mapDispatch
)(UserNavMenu);



