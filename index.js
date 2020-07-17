import { registerRootComponent } from 'expo'
import React from 'react'
import App from './src/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import firebase from './src/FireBase/firebaseConfig'
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import reducer from './src/ReduxStore/reducers'
import middleware from './src/ReduxStore/middleware'

const store = createStore(reducer, middleware)

const rrfProps = {
  firebase,
  config: {
    userProfile: "users"
  },
  dispatch: store.dispatch
};

const ReduxApp = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
)

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(ReduxApp);
