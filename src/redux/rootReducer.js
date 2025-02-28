import { combineReducers } from 'redux';

// ** Reducers Imports
import chat from './chat/reducer';

const rootReducer = combineReducers({chat});

export default rootReducer;