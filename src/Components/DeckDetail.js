import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import { StyleSheet, Platform } from 'react-native'
import { Container, Content, Card, CardItem, Body, Text, Left, Button, H2, Right, View } from 'native-base';
import Thumbnail from './Thumbnail'
import LoadedImage from './LoadedImage';
import { formatTime } from '../Utilities/helperFunctions'

export default function DeckDetail({ route, navigation }) {
  const { deckId } = route.params
  useFirebaseConnect(`decks/${deckId}`)
  const deck = useSelector(state => state.firebase.data.decks[deckId])

  const navigateToAddCard = () => (
    navigation.navigate('AddNewCard', {
      deckId: deckId
    })
  )

  const navigateToCards = () => (
    navigation.navigate('SwipeCards', {
      deckId: deckId,
      deckTitle: deck.title
    })
  )

  return (
    <Container>
      <Content style={styles.background}>
        <Card
          cardBorderRadius={Platform.OS === 'ios' ? 50 : 2}>
          <CardItem header>
            <Left>
              <Thumbnail topic={deck.topic} />
              <Body>
                <H2>{deck.title}</H2>
                <Text>Created by {deck.author}</Text>
                <Text note>On {formatTime(deck.date_created)}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body style={{ height: 200 }}>
              <LoadedImage imageRef={deck.show_image} type='backgroundImage'/>
            </Body>
          </CardItem>
          <CardItem style={styles.buttonView}>
            <Button
              danger
              style={styles.button}>
              <Text style={styles.buttonText}>Delete Deck</Text>
            </Button>
            <Button
              success
              style={styles.button}
              onPress={() => navigateToAddCard()}>
              <Text style={styles.buttonText}>Add Card</Text>
            </Button>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{deck.description}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left />
            <Right>
              <Text note>Cards Number: {deck.cards ? Object.keys(deck.cards).length : 0}</Text>
              <Text note>Total Views: {deck.views_number}</Text>
            </Right>
          </CardItem>
          <View>
            <Button
              block
              style={styles.startButton}
              transparent={Platform.OS === 'ios' ? true : false}
              onPress={() => navigateToCards()}>
              <Text
                fontSizeBase=''
                style={styles.buttonText}>Start Deck</Text>
            </Button>
          </View>
        </Card>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#e6e6e6',
    padding: 4
  },
  button: {
    justifyContent: 'center',
    width: 120
  },
  startButton: {
    alignContent: 'center',
    margin: 16,
  },
  buttonView:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    textAlign: 'center' 
  },
  buttonText: {
    alignSelf:'center',
    fontSize: 14
  },
})
