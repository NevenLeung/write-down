import { db, createDoc, updateDoc, getDoc } from '../api/pouchdb';

const USER_LOG_IN = 'write-down/user/USER_LOG_IN';

const userLogin = () => (
  {
    type: USER_LOG_IN
  }
);

const USER_LOG_OUT = 'write-down/user/USER_LOG_OUT';

const userLogout = () => (
  {
    type: USER_LOG_OUT
  }
);

const FETCH_LOGIN_DATA_REQUEST = 'write-down/user/FETCH_LOGIN_DATA_REQUEST';

const fetchLoginDataRequest = () => (
  {
    type: FETCH_LOGIN_DATA_REQUEST
  }
);

const FETCH_LOGIN_DATA_SUCCESS = 'write-down/user/FETCH_LOGIN_DATA_SUCCESS';

const fetchLoginDataSuccess = (loginData) => (
  {
    type: FETCH_LOGIN_DATA_SUCCESS,
    loginData
  }
);

const FETCH_LOGIN_DATA_FAILURE = 'write-down/user/FETCH_LOGIN_DATA_FAILURE';

const fetchLoginDataFailure = (error) => (
  {
    type: FETCH_LOGIN_DATA_FAILURE,
    error
  }
);

const fetchLoginData = () => async (dispatch) => {
  dispatch(fetchLoginDataRequest());

  let res;

  try {
    res = await getDoc(db, 'login data');

    if (typeof res !== 'undefined') {
      dispatch(fetchLoginDataSuccess(res));
    } else {
      dispatch(fetchLoginDataFailure(`Login data doesn't exit.`));
    }
  } catch (e) {
    dispatch(fetchLoginDataFailure(e));
  }

  return res;
};


const SAVE_LOGIN_DATA_REQUEST = 'write-down/user/SAVE_LOGIN_DATA_REQUEST';

const saveLoginDataRequest = () => (
  {
    type: SAVE_LOGIN_DATA_REQUEST
  }
);

const SAVE_LOGIN_DATA_SUCCESS = 'write-down/user/SAVE_LOGIN_DATA_SUCCESS';

// The loginData is the data return to update the state.
const saveLoginDataSuccess = (loginData) => (
  {
    type: SAVE_LOGIN_DATA_SUCCESS,
    loginData
  }
);

const SAVE_LOGIN_DATA_FAILURE = 'write-down/user/SAVE_LOGIN_DATA_FAILURE';

const saveLoginDataFailure = (error) => (
  {
    type: SAVE_LOGIN_DATA_FAILURE,
    error
  }
);

const saveLoginData = (loginData) => async (dispatch) => {
  dispatch(saveLoginDataRequest());

  let res;

  try {
    // There is a getDoc() logic in updateDoc().
    // If it is failed, which means there is no 'login data' in the database.
    // So it can't update the 'login data'. It needs to be created first.
    res = await updateDoc(db, 'login data', loginData);

    dispatch(saveLoginDataSuccess({
      username: res.username,
      password: res.password
    }));
  } catch (error) {
    dispatch(saveLoginDataFailure(error));

    // After the updateDoc() failed, it needs to be created first.
    res = await createDoc(db, { ...loginData, _id: 'login data' });

    dispatch(saveLoginDataSuccess({
      username: res.username,
      password: res.password
    }))
  }
};

const user = (
  state = {
    isLoggedIn: false,
    isFetchingLoginData: false,
    isSavingLoginData: false,
    error: '',
    loginData: {
      username: '',
      password: ''
    }
  },
  action
) => {
  switch (action.type) {
    case USER_LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case USER_LOG_OUT:
      return {
        ...state,
        isLoggedIn: false
      };
    case FETCH_LOGIN_DATA_REQUEST:
      return {
        ...state,
        isFetchingLoginData: true
      };
    case FETCH_LOGIN_DATA_SUCCESS:
      return {
        ...state,
        isFetchingLoginData: false,
        error: '',
        loginData: action.loginData
      };
    case FETCH_LOGIN_DATA_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case SAVE_LOGIN_DATA_REQUEST:
      return {
        ...state,
        isSavingLoginData: true
      };
    case SAVE_LOGIN_DATA_SUCCESS:
      return {
        ...state,
        isSavingLoginData: false,
        error: '',
        loginData: action.loginData
      };
    case SAVE_LOGIN_DATA_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export {
  user,
  userLogin,
  userLogout,
  fetchLoginData,
  saveLoginData,
};