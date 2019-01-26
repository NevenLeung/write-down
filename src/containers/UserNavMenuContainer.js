import {connect} from "react-redux";

import { createNewArticle } from "../ducks/articles";

import { UserNavMenu } from "../components/header/UserNavMenu";

const mapDispatch = {
  createNewArticle,
};

export default connect(
  null,
  mapDispatch
)(UserNavMenu);



