import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'
import { StyleSheet, View, FlatList } from 'react-native'
import { Container, Fab, Footer, FooterTab, Button, Icon, Header, Left } from 'native-base';
import DeckListItem from './DeckListItem';
import { createList } from '../Utilities/helperFunctions'


export default function DeckList({ navigation }) {
  const firebase = useFirebase()
  useFirebaseConnect('topics');
  useFirebaseConnect(`decks`)
  const decks = useSelector(state => createList(state.firebase.data.decks))

  const navigateToNewDeck = () => {
    navigation.navigate('AddNewDeck')
  }

  const logout = () => {
    firebase.logout()
  }

  const navigateToDetail = (itemId) => (
    navigation.navigate('DeckDetail', {
      deckId: itemId
    })
  )

  const renderItem = ({ item }) => (
    <DeckListItem deck={item} onPress={() => navigateToDetail(item.id)} />
  );

  return (
    <Container>
      {Platform.OS === 'android' ?
        <Header translucent>
          <Left>
            <Button
              onPress={() => logout()}>
              <Icon name='log-out' />
            </Button>
          </Left>
        </Header> : null}
      <FlatList
        data={decks}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
      />
      {Platform.OS === 'ios'
        ? <Footer>
          <FooterTab>
            <Button
              onPress={() => logout()}>
              <Icon name="log-out" style={{ fontSize: 30 }} />
            </Button>
            <View style={{ flex: 1 }} />
            <Button
              onPress={() => navigateToNewDeck()}>
              <Icon name="ios-create" style={{ fontSize: 30 }} />
            </Button>
          </FooterTab>
        </Footer>
        :
        <View style={{ flex: 1 }}>
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => navigateToNewDeck()}>
            <Icon name="create" />
          </Fab>
        </View>}
    </Container>
  )
}

const styles = StyleSheet.create({})

