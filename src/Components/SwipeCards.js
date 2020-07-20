import React from 'react';
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import { Container, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left } from 'native-base';
import { createList } from '../Utilities/helperFunctions'


export default function SwipeCards({ route }) {
  const { deckId, deckTitle } = route.params;

  useFirebaseConnect(`decks/${deckId}`)
  const cards = useSelector(state => createList(state.firebase.data.decks[deckId].cards))
  return (
    <Container style={{ flex: 1 }}>
      <View>
        <DeckSwiper
          dataSource={cards}
          renderItem={item =>
            <Card style={{ elevation: 3 }}>
              <CardItem>
                <Text>{deckTitle}</Text>
              </CardItem>
              <CardItem cardBody>
                <Text>{item.question}</Text>
                <Text note>{item.answer}</Text>
              </CardItem>
            </Card>
          }
        />
      </View>
    </Container>
  );
}