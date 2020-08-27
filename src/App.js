import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Container, Icon } from 'native-base';
import Login from './Components/Login';
import { setLocalNotification } from './Utilities/helperFunctions'
import { useFirebaseConnect, isLoaded, isEmpty, useFirebase } from 'react-redux-firebase'
import DeckList from './Components/DeckList';
import DeckDetail from './Components/DeckDetail'
import SwipeCards from './Components/SwipeCards'
import AddNewCard from './Components/AddNewCard'
import AddNewDeck from './Components/AddNewDeck'
import SplashScreen from './Components/SplashScreen';
import Score from './Components/Score'
import * as Font from 'expo-font';

// create the stackNavigator
const Stack = createStackNavigator();

const ANDROID = Platform.OS === 'android'

export default function App() {
  // load user and topics
  useFirebaseConnect('topics');
  useFirebaseConnect('users');
  const firebase = useFirebase()
  //set splash for splashScreen
  const [splash, setSplash] = useState(true)
  const auth = useSelector(state => state.firebase.auth)

  useEffect(() => {
    // create a local notification
    setLocalNotification()
    // after 3sec hide splashScreen
    setTimeout(() => {
      setSplash(false)
    }, 3000);
    
    // load required fonts for android - native-base create an error if don´t
    (async () => await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }))();
  }, [])

  // function to load the splashScreen - wraps all other elements
  function Loading({ children }) {
    if (splash) return <SplashScreen />;
    return children
  }

  return (
    <Container>
      <Loading>
        <NavigationContainer>
          <Stack.Navigator
          // on android shows a themed header
            screenOptions={{
              headerStyle: {
                backgroundColor: ANDROID && '#3F51B5',
              },
              headerTintColor: ANDROID && '#fff',
            }}
            initialRouteName={isLoaded(auth) && !isEmpty(auth) ? "Login" : "DeckList"}>
            {isLoaded(auth) && !isEmpty(auth) ?
              <>
                <Stack.Screen
                  name="DeckList"
                  component={DeckList}
                  options={{
                    // on android shows a header with a logout icon
                    headerLeft: (props) => (
                      <Icon
                        {...props}
                        name='exit'
                        style={{ marginLeft: 20, color: '#fff' }}
                        onPress={() => {
                          firebase.logout()
                        }}
                      />
                    ),
                  }} />
                <Stack.Screen
                  name="DeckDetail"
                  component={DeckDetail} />
                <Stack.Screen
                  name="SwipeCards"
                  component={SwipeCards}
                  // the swipe cards has no header
                  options={{
                    headerShown: false,
                  }} />
                <Stack.Screen
                  name="AddNewCard"
                  component={AddNewCard} />
                <Stack.Screen
                  name="AddNewDeck"
                  component={AddNewDeck} />
                <Stack.Screen
                  name="Score"
                  component={Score}
                  // the score alse has no header
                  options={{
                    headerShown: false,
                  }} />
              </> :
              <>
              {/* if not logged return to login */}
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{
                    headerShown: false,
                  }} />
              </>}
          </Stack.Navigator>
        </NavigationContainer>
      </Loading>
      <StatusBar style="dark" />
    </Container>
  );
}