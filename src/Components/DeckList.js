import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { StyleSheet, View, FlatList} from 'react-native'
import { Container, Fab, Footer, FooterTab, Button, Icon } from 'native-base';
import DeckListItem from './DeckListItem';
import { createDeckList } from '../Utilities/helperFunctions'


export default function DeckList({ navigation }) {


  const decks = useSelector(state => createDeckList(state.decks))
  console.log("Selected decks: " + decks)

  const navigateToNewDeck = () => {
    navigation.navigate('AddNewDeck')
  }

  const navigateToDetail = (item) => (
    navigation.navigate('DeckDetail', {
      deckId: item.id
    })
  )
  
  const renderItem = ({ item }) => (
    <DeckListItem item={item} onPress={() => navigateToDetail(item)} />
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

