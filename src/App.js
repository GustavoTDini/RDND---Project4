import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Platform, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Container, Icon } from 'native-base';
import Login from './Components/Login';
import { useFirebaseConnect, isLoaded, isEmpty, useFirebase } from 'react-redux-firebase'
import DeckList from './Components/DeckList';
import DeckDetail from './Components/DeckDetail'
import SwipeCards from './Components/SwipeCards'
import AddNewCard from './Components/AddNewCard'
import AddNewDeck from './Components/AddNewDeck'
import SplashScreen from './Components/SplashScreen';
import Score from './Components/Score'
import * as Font from 'expo-font';

const Stack = createStackNavigator();

const ANDROID = Platform.OS === 'android'

export default function App() {
  useFirebaseConnect('topics');
  useFirebaseConnect('users');
  const firebase = useFirebase()
  const [splash, setSplash] = useState(true)
  const auth = useSelector(state => state.firebase.auth)

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 3000);

    (async () => await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }))();
  }, [])

  function Loading({ children }) {
    if (splash) return <SplashScreen />;
    return children
  }

  return (
    <Container>
      <Loading>
        <NavigationContainer>
          <Stack.Navigator
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
                  options={{
                    headerShown: false,
                  }} />
              </> :
              <>
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