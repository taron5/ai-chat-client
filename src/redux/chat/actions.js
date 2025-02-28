import { createAction } from 'redux-actions';

export const sendMessageRequest = createAction('SEND_MESSAGE_REQUEST');
export const sendMessageSuccess = createAction('SEND_MESSAGE_SUCCESS');
export const sendMessageFailure = createAction('SEND_MESSAGE_FAILURE');

export const fetchChatsRequest = createAction('FETCH_CHATS_REQUEST');
export const fetchChatsSuccess = createAction('FETCH_CHATS_SUCCESS');
export const fetchChatsFailure = createAction('FETCH_CHATS_FAILURE');

export const createChatRequest = createAction('CREATE_CHAT_REQUEST');
export const createChatSuccess = createAction('CREATE_CHAT_SUCCESS');
export const createChatFailure = createAction('CREATE_CHAT_FAILURE');

export const getMessagesByChatRequest = createAction('GET_MESSAGES_BY_CHAT_REQUEST');
export const getMessagesByChatSuccess = createAction('GET_MESSAGES_BY_CHAT_SUCCESS');
export const getMessagesByChatFailure = createAction('GET_MESSAGES_BY_CHAT_FAILURE');
