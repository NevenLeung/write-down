import {connect} from "react-redux";

import { createNewArticle } from "../ducks/currentEditing";

import { UserNavMenu } from "../components/header/UserNavMenu";

const mapDispatch = {
  createNewArticle,
};

export default connect(
  null,
  mapDispatch
)(UserNavMenu);



