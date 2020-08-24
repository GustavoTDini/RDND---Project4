import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'
import { StyleSheet, Platform, Alert } from 'react-native'
import { Container, Content, Card, CardItem, Body, Text, Left, Button, H2, Right, View, Spinner} from 'native-base';
import Thumbnail from './Thumbnail'
import LoadedImage from './LoadedImage';
import { formatTime } from '../Utilities/helperFunctions'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DeckDetail() {
  const navigation = useNavigation()
  const route = useRoute()
  const { deckId } = route.params
  useFirebaseConnect(`decks/${deckId}`)
  const firebase = useFirebase()
  const deck = useSelector(state => state.firebase.data.decks[deckId])
  const userId = useSelector(state => state.firebase.auth.uid)
  const [deleted, setDeleted] = useState(false)
  
  const navigateToAddCard = () => (
    navigation.navigate('AddNewCard', {
      deckId: deckId
    })
  )

  navigateToCards = () => {
    const addedViewsNumber = deck.views_number + 1
    firebase.update(`decks/${deckId}`, {views_number:addedViewsNumber})
    navigation.navigate('SwipeCards', {
      deckId: deckId,
      deckTitle: deck.title
    })

  }

  const createConfirmAlert = () =>
    Alert.alert(
      "Warning",
      "Are you sure you want to delete this Deck",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteDeck() }
      ],
      { cancelable: true }
    );

  const deleteDeck = () => {
    firebase.remove(`decks/${deckId}`, setDeleted(true))
  }

  if (deleted) {
    setTimeout(() => {
      navigation.navigate('DeckList')
    }, 500);
    
  }


  return (
    <Container>
      {deleted && <Spinner color='blue'/>}
      {!deleted &&
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
                <LoadedImage imageRef={deck.show_image} type='backgroundImage' />
              </Body>
            </CardItem>
            {userId === deck.authorId &&
              <CardItem style={styles.buttonView}>
                <Button
                  danger
                  style={styles.button}
                  onPress={() => createConfirmAlert()}>
                  <Text style={styles.buttonText}>Delete Deck</Text>
                </Button>
                <Button
                  success
                  style={styles.button}
                  onPress={() => navigateToAddCard()}>
                  <Text style={styles.buttonText}>Add Card</Text>
                </Button>
              </CardItem>
            }
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
      }
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
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 14
  },
})
