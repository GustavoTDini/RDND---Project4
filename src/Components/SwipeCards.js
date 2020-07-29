import React, { useRef } from 'react';
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import { StyleSheet } from 'react-native'
import { Container, View, Text, Button } from 'native-base';
import { createList } from '../Utilities/helperFunctions'
import FlipCard from './FlipCard';
import CardStack, { Card } from 'react-native-card-stack-swiper';

export default function SwipeCards({ route }) {
  const swiperRef = useRef(null)
  const { deckId, deckTitle } = route.params;

  useFirebaseConnect(`decks/${deckId}`)
  let cards = useSelector(state => createList(state.firebase.data.decks[deckId].cards))

  removeCardFromDeck = (index) => {
    cards.splice(index, 1)
  }

  return (
    <Container style={styles.container}>
      <Text>{deckTitle}</Text>
      <View>
        <CardStack ref={swiperRef} loop={true}>
          {cards.map((card, index) => (
            <View>
              <Card key={card.id} style={styles.card}>
                <FlipCard
                  question={card.question}
                  answer={card.answer} />
              </Card>
              <Button onPress={removeCardFromDeck(index)}>
                <Text>Saw it</Text>
              </Button>
            </View>

          ))}
        </CardStack>
      </View>

    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#9F9F9F',
  },
  card: {
    width: 320,
    height: 470,
  }
});