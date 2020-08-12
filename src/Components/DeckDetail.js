import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import { StyleSheet } from 'react-native'
import { Container, Content, Card, CardItem, Body, Text, Left, Button, H2, Right } from 'native-base';
import Thumbnail from './Thumbnail'
import BackgroundImage from './BackgroundImage';
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
      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem>
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
            <Body style={{height: 200}}>
              <BackgroundImage imageRef={deck.show_image} />
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{deck.description}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Right style={{alignContent:'flex-end', marginEnd:-50}}>
            <Text note>Cards Number: {deck.cards? Object.keys(deck.cards).length: 0}</Text>
  
  <Text note>Total Views: {deck.views_number}</Text>

            </Right>
          </CardItem>

          <CardItem style = {{flexDirection:'column'}}>
            <Button
              onPress={() => navigateToCards()}>
              <Text>Start Deck</Text>
            </Button>
            <Button>
              <Text>Delete Deck</Text>
            </Button>
            <Button
              onPress={() => navigateToAddCard()}>
              <Text>Add Card</Text>
            </Button>

          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({})
