import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Container } from 'native-base';
import Login from './Components/Login';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import DeckList from './Components/DeckList';
import DeckDetail from './Components/DeckDetail'
import SwipeCards from './Components/SwipeCards'
import AddNewCard from './Components/AddNewCard'
import AddNewDeck from './Components/AddNewDeck'
import SplashScreen from './Components/SplashScreen';
import * as Font from 'expo-font';

const Stack = createStackNavigator();

export default function App() {
  useFirebaseConnect('topics');
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
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="DeckList" component={DeckList} />
            <Stack.Screen name="DeckDetail" component={DeckDetail} />
            <Stack.Screen name="SwipeCards" component={SwipeCards} />
            <Stack.Screen name="AddNewCard" component={AddNewCard} />
            <Stack.Screen name="AddNewDeck" component={AddNewDeck} />
          </Stack.Navigator>
        </NavigationContainer>
      </Loading>
      <StatusBar style="dark" />
    </Container>
  );
}