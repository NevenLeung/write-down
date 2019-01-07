import {connect} from "react-redux";
import { bindActionCreators } from "redux";

import { createNewArticle } from "../ducks/currentEditing";

import { UserNavMenu } from "../components/header/UserNavMenu";

const mapDispatch = (dispatch) => (
  bindActionCreators({
    createNewArticle,
  }, dispatch)
);

export default connect(
  null,
  mapDispatch
)(UserNavMenu);



