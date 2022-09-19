import {SEND_MESSAGE,RECEIVED_MESSAGE,initialChat} from '../const'

const chatsReducer = (state = initialChat, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
            sender: action.sender,
            message: action.message
            };

            let newState = { ...state, chats: state.chats.push(newMessage) };
            return state;
        case RECEIVED_MESSAGE:
            let newMessage = {
                sender: payload.sender,
                message: payload.message
            };
            return { ...state, chats: state.chats.push(newMessage) };
      default:
        state;
    }
    return state;
  };

  export default chatsReducer;