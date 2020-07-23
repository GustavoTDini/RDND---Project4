import React from 'react';
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import { Container, View, DeckSwiper, Card, Text, Content } from 'native-base';
import { createList } from '../Utilities/helperFunctions'
import FlipCard from './FlipCard';


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
            <Content id={item.id}>
              <Text>{deckTitle}</Text>
              <Card style={{ elevation: 3 }}>
                <FlipCard
                  question = {item.question}
                  answer = {item.answer}/>
              </Card>
            </Content>
          }
        />
      </View>
    </Container>
  );
}