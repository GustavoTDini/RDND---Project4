import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native'
import { Container} from 'native-base';
import Login from './Components/Login';
import DeckList from './Components/DeckList';
import DeckDetail from './Components/DeckDetail'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Container>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CardList" component={DeckList} />
          <Stack.Screen name="DeckDetail" component={DeckDetail} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </Container>
  );
}

const styles = StyleSheet.create({

});
