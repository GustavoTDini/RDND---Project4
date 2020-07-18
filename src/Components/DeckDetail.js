import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import { StyleSheet } from 'react-native'
import { Container, Content, Card, CardItem, Body, Text, Left, Button, Icon, H2 } from 'native-base';
import Thumbnail from './Thumbnail'
import BackgroundImage from './BackgroundImage';

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
              <Thumbnail type={deck.type} />
              <Body>
                <H2>{deck.title}</H2>
                <Text>Create by {deck.author}</Text>
                <Text note>{deck.date_created}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <BackgroundImage imageRef={deck.show_image} />
            </Body>
          </CardItem>
          <CardItem>
            <Left>
            <Text>Cards Number</Text>
  <Text>{deck.cards_number}</Text>
  <Text>Total Views</Text>
  <Text>{deck.views_number}</Text>
            </Left>
          </CardItem>

          <CardItem style = {{flexFlow: 'column'}}>
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
