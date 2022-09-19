import {SET_USER,SEND_MESSAGE,RECEIVED_MESSAGE} from '../const'


export const setUser = (user) => {
    return {
      type: SET_USER,
      payload:user
    };
};
export const sendMess = (message,sender) => {
    return {
      type: SEND_MESSAGE,
      payload:{
        message:message, 
        sender:sender
      }
    };
};
export const receiveMess = (params) => {
    return {
      type: RECEIVED_MESSAGE,
      payload:params
    };
};
