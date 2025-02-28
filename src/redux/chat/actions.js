import { createAction } from 'redux-actions';

export const sendMessageRequest = createAction('SEND_MESSAGE_REQUEST');
export const sendMessageSuccess = createAction('SEND_MESSAGE_SUCCESS');
export const sendMessageFailure = createAction('SEND_MESSAGE_FAILURE');

export const fetchChatsRequest = createAction('FETCH_CHATS_REQUEST');
export const fetchChatsSuccess = createAction('FETCH_CHATS_SUCCESS');
export const fetchChatsFailure = createAction('FETCH_CHATS_FAILURE');