import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native'
import { Container } from 'native-base';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './ReduxStore/reducers'
import middleware from './ReduxStore/middleware'
import Login from './Components/Login';
import DeckList from './Components/DeckList';
import DeckDetail from './Components/DeckDetail'
import SwipeCards from './Components/SwipeCards'
import AddNewCard from './Components/AddNewCard'
import AddNewDeck from './Components/AddNewDeck'

const Stack = createStackNavigator();

const store = createStore(reducer, middleware)

export default function App() {

  

  return (
    <Provider store={store}>
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

    </Provider>

  );
}

const styles = StyleSheet.create({

});
