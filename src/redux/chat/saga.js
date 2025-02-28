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
    getMessagesByChatSuccess,
    getMessagesByChatFailure,
    getMessagesByChatRequest
  } from './actions';
  
  import { call, put, takeLatest } from 'redux-saga/effects';

  import axiosInstance from '../../utils/axiosInstance';
  import showToast from '../../utils/toast';
  
  function* sendMessage({ payload }) {
    try {
      const response = yield call(() =>
        axiosInstance.post(`/chat/message/send`, payload)
      );
      if (response.status === 200) {
        yield put(sendMessageSuccess(response.data));
      }
    } catch (e) {
      console.log(`Catch for sendMessage, error`, e);
      if (e.message) {
        showToast(e.message);
        yield put(sendMessageFailure(e.message));
      }
    }
  }

  function* fetchChats({ payload }) {
    try {
      const response = yield call(() =>
        axiosInstance.get(`/chat/history/${payload.userId}`)
      );
      if (response.status === 200) {
        yield put(fetchChatsSuccess(response.data));
      }
    } catch (e) {
      console.log(`Catch for fetchChats, error`, e);
      if (e.message) {
        showToast(e.message);
        yield put(fetchChatsFailure(e.emessage));
      }
    }
  }

  function* createChat({ payload }) {
    try {
      const response = yield call(() =>
        axiosInstance.post(`/chat/create`, payload)
      );
      
      if (response.status === 200) {
        yield put(createChatSuccess(response.data));
      }
    } catch (e) {
      console.log(`Catch for createChat, error`, e);
      if (e.message) {
        showToast(e.message);
        yield put(createChatFailure(e.emessage));
      }
    }
  }

  function* messagesByChat({ payload }) {
    try {
      const response = yield call(() =>
        axiosInstance.get(`/chat/messages/${payload.chatId}`)
      );
      if (response.status === 200) {
        yield put(getMessagesByChatSuccess(response.data));
      }
    } catch (e) {
      console.log(`Catch for messagesByChat, error`, e);
      if (e.message) {
        showToast(e.message);
        yield put(getMessagesByChatFailure(e.emessage));
      }
    }
  }
  
  export default function* () {
    yield takeLatest(sendMessageRequest, sendMessage);
    yield takeLatest(fetchChatsRequest, fetchChats);
    yield takeLatest(createChatRequest, createChat);
    yield takeLatest(getMessagesByChatRequest, messagesByChat);
  }
