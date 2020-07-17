import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Container } from 'native-base';
import Login from './Components/Login';
import { useFirebaseConnect } from 'react-redux-firebase'
import DeckList from './Components/DeckList';
import DeckDetail from './Components/DeckDetail'
import SwipeCards from './Components/SwipeCards'
import AddNewCard from './Components/AddNewCard'
import AddNewDeck from './Components/AddNewDeck'

const Stack = createStackNavigator();

export default function App() {

  useFirebaseConnect(['decks', 'types']);

  return (
    <Container>
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
      <StatusBar style="dark" />
    </Container>
  );
}