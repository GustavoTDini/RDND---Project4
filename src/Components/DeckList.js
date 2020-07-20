import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'
import { StyleSheet, View, FlatList} from 'react-native'
import { Container, Fab, Footer, FooterTab, Button, Icon } from 'native-base';
import DeckListItem from './DeckListItem';
import { createList } from '../Utilities/helperFunctions'


export default function DeckList({ navigation }) {
  useFirebaseConnect(`decks`)
  const decks = useSelector(state => createList(state.firebase.data.decks))

  const navigateToNewDeck = () => {
    navigation.navigate('AddNewDeck')
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
      <FlatList
        data={decks}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
      />
      {Platform.OS === 'ios'
        ? <Footer>
          <FooterTab>
            <View style={{flex:3}}/>
            <Button
              onPress={()=>navigateToNewDeck()}>
              <Icon name="ios-create" style={{fontSize:30}}/>
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
            onPress={()=>navigateToNewDeck()}>
            <Icon name="create" />
          </Fab>
        </View>}
    </Container>
  )
}

const styles = StyleSheet.create({})

