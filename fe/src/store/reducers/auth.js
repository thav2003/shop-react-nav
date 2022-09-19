import {SET_USER,initialState} from '../const'

const AuthUser = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return {
            user:action.payload
        }
      default:
        return state;
    }
  };
   
  export default AuthUser;