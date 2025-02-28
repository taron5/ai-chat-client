import {
    sendMessageRequest,
    sendMessageSuccess,
    sendMessageFailure,
    fetchChatsRequest,
    fetchChatsSuccess,
    fetchChatsFailure
  } from './actions';

  import axiosInstance from '../../utils/axiosInstance';
  import { call, put, takeLatest } from 'redux-saga/effects';

  
  function* sendMessage({ payload }) {
    try {
      const response = yield call(() =>
        axiosInstance.post(`/chat/message/send`, payload)
      );
      if (response?.status === 200) {
        yield put(sendMessageSuccess(response.data));
      }
    } catch (e) {
      console.log(`Catch for sendMessage, error`, e);
      if (e.response.data) {
        yield put(sendMessageFailure(e.response.data?.message));
      }
    }
  }

  function* fetchChats({ payload }) {
    try {
      const response = yield call(() =>
        axiosInstance.get(`/chat/history/${payload.userId}`)
      );
      if (response?.status === 200) {
        yield put(fetchChatsSuccess(response.data));
      }
    } catch (e) {
      console.log(`Catch for fetchChats, error`, e);
      if (e.response.data) {
        yield put(fetchChatsFailure(e.response.data?.message));
      }
    }
  }
  
  export default function* () {
    yield takeLatest(sendMessageRequest, sendMessage);
    yield takeLatest(fetchChatsRequest, fetchChats);
  }