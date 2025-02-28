import { handleActions } from 'redux-actions';
import {
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
  fetchChatsRequest,
  fetchChatsSuccess,
  fetchChatsFailure
} from './actions';

const initialState = {
    isSendingMesssage: false,
    isSendingMesssageSuccess: false,
    isSendingMesssageFailure: false,
    message: {},
    isFetchingChats: false,
    chatHistory: [],
};

const reducer = handleActions(
  {
    [sendMessageRequest]: (state) => ({
      ...state,
      isCreatingChat: true,
      isSendingMesssageSuccess: false,
      isSendingMesssageFailure: false,
    }),
    [sendMessageSuccess]: (state, {payload}) => ({
      ...state,
      isCreatingChat: false,
      isSendingMesssageSuccess: true,
      message: payload.data,
    }),
    [sendMessageFailure]: (state, {payload}) => ({
      ...state,
      isCreatingChat: false,
      isSendingMesssageFailure: true,
      message: payload,
    }),
    [fetchChatsRequest]: (state) => ({
      ...state,
      isFetchingChats: true,
    }),
    [fetchChatsSuccess]: (state, {payload}) => ({
      ...state,
      isFetchingChats: false,
      chatHistory: payload.chats,
    }),
    [fetchChatsFailure]: (state, {payload}) => ({
      ...state,
      isFetchingChats: false,
      message: payload,
    }),
  },
  initialState
);

export default reducer;