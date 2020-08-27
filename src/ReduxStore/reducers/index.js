import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

// the redux uses the firebase reducer from react-redux-firebase
export default combineReducers({
  firebase: firebaseReducer,
})