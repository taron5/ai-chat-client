import { handleActions } from 'redux-actions';
import {
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
  fetchChatsRequest,
  fetchChatsSuccess,
  fetchChatsFailure,
  createChatRequest,
  createChatSuccess,
  createChatFailure,
  getMessagesByChatRequest,
  getMessagesByChatSuccess,
  getMessagesByChatFailure
} from './actions';

const initialState = {
    isSendingMessage: false,
    isSendingMessageSuccess: false,
    isSendingMessageFailure: false,
    message: {},
    isFetchingChats: false,
    chatHistory: [],
    error: [],
    isFetchingChatsSuccess: false,
    isFetchingChatsFailure: false,
    messages: [],
    isGettingMessagesByChat: false,
    isGettingMessagesByChatSuccess: false,
    isGettingMessagesByChatFailure: false,
};

const reducer = handleActions(
  {
    [sendMessageRequest]: (state, {payload}) => ({
      ...state,
      isSendingMessage: true,
      isSendingMessageSuccess: false,
      isSendingMessageFailure: false,
      messages: [...state.messages, {
        id: Date.now(),
        sender: 'user',
        message: payload.message,
        isTemp: true
      }]
    }),
    [sendMessageSuccess]: (state, {payload}) => ({
      ...state,
      messages: [...state.messages, payload.message],
      isSendingMessage: false,
      isSendingMessageSuccess: true
    }),
    [sendMessageFailure]: (state, {payload}) => ({
      ...state,
      isSendingMessage: false,
      isSendingMessageFailure: true,
      error: payload,
    }),
    [fetchChatsRequest]: (state) => ({
      ...state,
      isFetchingChats: true,
      isFetchingChatsSuccess: false,
      isFetchingChatsFailure: false,
    }),
    [fetchChatsSuccess]: (state, {payload}) => ({
      ...state,
      isFetchingChats: false,
      isFetchingChatsSuccess: true,
      chatHistory: payload.chats,
    }),
    [fetchChatsFailure]: (state, {payload}) => ({
      ...state,
      isFetchingChats: false,
      isFetchingChatsFailure: true,
      error: payload,
    }),
    [createChatRequest]: (state) => ({
      ...state,
      isCreatingNewChat: true,
      isCreatingNewChatSuccess: false,
      isCreatingNewChatFailure: false,
    }),
    [createChatSuccess]: (state, {payload}) => ({
    ...state,
      isCreatingNewChat: false,
      isCreatingNewChatSuccess: true,
      chatHistory: [payload.chat, ...state.chatHistory]
    }),
    [createChatFailure]: (state, {payload}) => ({
      ...state,
      isCreatingNewChat: false,
      isCreatingNewChatFailure: true,
      error: payload,
    }),
    [getMessagesByChatRequest]: (state) => ({
      ...state,
      isGettingMessagesByChat: true,
      isGettingMessagesByChatSuccess: false,
      isGettingMessagesByChatFailure: false,
    }),
    [getMessagesByChatSuccess]: (state, {payload}) => ({
      ...state,
      isGettingMessagesByChat: false,
      isGettingMessagesByChatSuccess: true,
      messages: payload. messages,
    }),
    [getMessagesByChatFailure]: (state, {payload}) => ({
      ...state,
      isGettingMessagesByChat: false,
      isGettingMessagesByChatFailure: true,
      error: payload,
    }),
  },
  initialState
);

export default reducer;
