import { all } from 'redux-saga/effects';
import chat from './chat/saga';

export default function* rootSaga() {
  yield all([chat()]);
}