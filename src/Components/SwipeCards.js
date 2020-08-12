import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import { StyleSheet, Platform, Image } from 'react-native'
import { Container, View, Text, Button } from 'native-base';
import { createList } from '../Utilities/helperFunctions'
import FlipCard from './FlipCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { checkIos, wrongIos, checkAndroid, wrongAndroid } from '../Assets'

export default function SwipeCards({ route }) {
  const swiperRef = useRef(null)
  const { deckId, deckTitle } = route.params;
  const [currentCard, setCurrentCard] = useState(0)
  const [rightCounts, setRightCounts] = useState(0)
  const [showButtons, setShowButtons] = useState(false)


  useFirebaseConnect(`decks/${deckId}`)
  let cards = useSelector(state => createList(state.firebase.data.decks[deckId].cards))
  const cardsTotal = cards.length

  useEffect(() => {
  }, [deck])
  const [deck, setDeck] = useState(cards)

  let removeCardFromDeck = (index, ref, right) => {
    let cardId = deck[index].id
    setCurrentCard(0)
    setDeck(deck.filter(card => card.id !== cardId))
    if (right) {
      this.swiper.swipeRight();
      setRightCounts(rightCounts + 1)
    } else {
      this.swiper.swipeLeft();
    }
  }

  const showAnswer = (show) =>{
    setShowButtons(show)
  }

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>{deckTitle}</Text>
      <CardStack
        style={styles.main}
        ref={swiper => {
          this.swiper = swiper
        }}
        renderNoMoreCards={() => deck.length === 0 ? <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text> : null}
        loop={true}
        secondCardZoom={deck.length === 1 ? 0 : 0.95}
        verticalSwipe={deck.length === 1 ? false : true}
        horizontalSwipe={deck.length === 1 ? false : true}
        onSwiped={(index) => setCurrentCard(index + 1 === deck.length ? 0 : index + 1)}>
        {deck.map((card, index) => (
          <View>
            <Card
              key={card.id}
              style={styles.card}>
              <FlipCard
                question={card.question}
                answer={card.answer}
                showAnswer= {showAnswer}/>
            </Card>
          </View>
        ))}
      </CardStack>
      <View style={styles.footer}>
      {showButtons ?
      
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {
            removeCardFromDeck(currentCard, swiperRef, false);
          }}>
            <Image source={Platform.OS === 'ios' ? wrongIos : wrongAndroid} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            removeCardFromDeck(currentCard, swiperRef, true);
          }}>
            <Image source={Platform.OS === 'ios' ? checkIos : checkAndroid} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
          </TouchableOpacity>
        </View>
      : null
      }
</View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center'
  },
  main: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 320,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});