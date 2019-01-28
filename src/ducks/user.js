const USER_LOG_IN = 'write-down/user/USER_LOG_IN';
const USER_LOG_OUT = 'write-down/user/USER_LOG_OUT';

const userLogin = (username, password) => (
  {
    type: USER_LOG_IN,
    username,
    password
  }
);

const userLogout = () => (
  {
    type: USER_LOG_OUT
  }
);

const user = (
  state = {
    isLoggedIn: false,
    loginData: {
      username: '',
      password: ''
    }
  },
  action
) => {
  switch (action.type) {
    case USER_LOG_IN: {
      const { username, password } = action;

      return {
        ...state,
        isLoggedIn: true,
        loginData: {
          username,
          password
        }
      };
    }

    case USER_LOG_OUT:
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

// const userAuthentication = (state, action) => {
//   switch (action.type) {
//     case USER_LOG_IN: {
//       const { username, password } = action;
//
//       return {
//         ...state,
//         isLoggedIn: true,
//         loginData: {
//           username,
//           password
//         }
//       };
//     }
//     default:
//       return state;
//   }
// };

export {
  user,
  userLogin,
  userLogout
};