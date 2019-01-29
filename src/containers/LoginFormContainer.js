import { connect } from 'react-redux';

import { userLogin } from "../ducks/user";

import { WrappedLoginForm as LoginForm } from "../components/login/LoginForm";

const mapState = (state) => (
  {
    loginData: state.user.loginData
  }
);

const mapDispatch = {
  userLogin
};

export default connect(
  mapState,
  mapDispatch
)(LoginForm);