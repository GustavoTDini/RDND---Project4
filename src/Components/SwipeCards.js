import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import { StyleSheet, Platform, Image, View, Text, Dimensions } from 'react-native'
import { createList } from '../Utilities/helperFunctions'
import FlipCard from './FlipCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { checkIos, wrongIos, checkAndroid, wrongAndroid, backAndroid, backIos } from '../Assets'
import { useNavigation, useRoute } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel'
import Swiper from 'react-native-deck-swiper'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export default function SwipeCards() {
  const navigation = useNavigation()
  const route = useRoute()
  const { deckId, deckTitle } = route.params;

  useEffect(() => {
  }, [currentCardIndex, deck])

  useFirebaseConnect(`decks/${deckId}`)
  const cards = useSelector(state => createList(state.firebase.data.decks[deckId].cards))
  const cardsTotal = cards.length

  if (cardsTotal === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={Platform.OS === 'ios' ? backIos : backAndroid}
              resizeMode={'contain'}
              style={Platform.OS === 'ios' ? styles.backIconIOS : styles.icon} />
          </TouchableOpacity>
          <Text style={styles.title}>{deckTitle}</Text>
        </View>
        <View
          style={styles.main}>
          <Text style={styles.noMoreCardText}>This Deck has no cards!</Text>
        </View>
      </View>
    )
  }

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [deck, setDeck] = useState(cards)
  const [rightCounts, setRightCounts] = useState(0)
  const [showButtons, setShowButtons] = useState(false)

  function showAnswer(show) {
    setShowButtons(show)
  }

  let removeCardFromDeck = (right) => {
    const cardToRemove = deck[currentCardIndex].id
    setDeck(deck.filter(card => card.id !== cardToRemove))
    console.log('Current Card: ' + cardToRemove)
    if (right) {
      setRightCounts(rightCounts + 1)
    }
    this.swiper.snapToItem (0, animated = true, fireCallback = true);

  }


  const RenderCard = (card) => {
    return (
      <View style={styles.card}>
        <FlipCard
          cardId={card.id}
          question={card.question}
          answer={card.answer}
          answerImage={card.answerImage}
          questionImage={card.questionImage}
          showAnswer={showAnswer} />
      </View>
    );
  }

  function updateIndex(previousIndex) {
    setCurrentCardIndex(previousIndex + 1 === deck.length ? 0 : previousIndex + 1)
  }




  if (deck.length === 0) {
    navigation.navigate('Score', {
      totalCards: cardsTotal,
      rights: rightCounts,
      deckId: deckId,
      deckTitle: deckTitle
    })
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Platform.OS === 'ios' ? backIos : backAndroid}
            resizeMode={'contain'}
            style={Platform.OS === 'ios' ? styles.backIconIOS : styles.icon} />
        </TouchableOpacity>
        <View style={{flexDirection:'column'}}>
          <Text style={styles.title}>{deckTitle}</Text>
          <Text style={styles.title} note>{deck.length} Questions Left</Text>
        </View>

      </View>
      <View style={styles.main}>
      <Carousel
          ref={swiper => {
            this.swiper = swiper
          }}
          data={deck}
          renderItem={RenderCard}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          layout='tinder'
          onSnapToItem={(index) => setCurrentCardIndex(index)}
        />

        {/* <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          useViewOverflow={Platform.OS === 'ios'}
          cards={deck}
          renderCard={RenderCard}
          backgroundColor={'#e6e6e6'}
          cardVerticalMargin={-40}
          cardHorizontalMargin={20}
          infinite={true}
          showSecondCard={true}
          onSwiped={(index) => updateIndex(index)}
          stackSize={deck.length > 3 ? 2 : deck.length === 1 ? 0 : 1}
          verticalSwipe={deck.length === 1 ? false : true}
          horizontalSwipe={deck.length === 1 ? false : true}
        /> */}
      </View>




      {/* <CardStack
        style={styles.main}
        ref={swiper => { this.swiper = swiper }}
        renderNoMoreCards={() => deck.length === 0 ? <Text style={styles.noMoreCardText}>No more cards :(</Text> : null}
        loop={true}
        secondCardZoom={deck.length === 1 ? 0 : 0.95}
        verticalSwipe={deck.length === 1 ? false : true}
        horizontalSwipe={deck.length === 1 ? false : true}>
        {deck.map((card) => (

        ))}
      </CardStack> */}
      <View style={styles.footer}>
        {showButtons &&
          <View style={styles.answerView}>
            <Text>Did you get it Right?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  removeCardFromDeck(false);
                }}>
                <Image
                  source={Platform.OS === 'ios' ? wrongIos : wrongAndroid}
                  resizeMode={'contain'}
                  style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  removeCardFromDeck(true);
                }}>
                <Image
                  source={Platform.OS === 'ios' ? checkIos : checkAndroid}
                  resizeMode={'contain'}
                  style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e6e6e6',
  },
  header: {
    flex: 1,
    ...Platform.select({
      ios: {
        margin: 24,
      },
      android: {
        margin: 16,
      }
    }),
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIconIOS: {
    height: 45,
    width: 45,
    margin: 10,
    marginStart: 0
  },
  icon: {
    ...Platform.select({
      ios: {
        height: 60,
        width: 60,
      },
      android: {
        height: 50,
        width: 50,
        margin: 8
      }
    }),
  },
  title: {
    marginStart: 16,
    alignItems: 'center',
    textAlignVertical: "center",
    justifyContent: 'flex-start',
    textAlign: 'center',
    fontSize: 20
  },
  main: {
    ...Platform.select({
      ios: {
        marginTop: 16,
        flex: 5,
      },
      android: {
        marginTop: 50,
        flex: 4,
      }
    }),
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
    alignItems: 'center',
  },
  answerView: {
    ...Platform.select({
      ios: {
        marginTop: 56
      },
      android: {
        marginTop: 84
      }
    }),
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 20
  },
  buttonContainer: {
    ...Platform.select({
      ios: {
        marginTop: 10
      }
    }),
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noMoreCardText: {
    fontWeight: '700',
    fontSize: 18,
    color: 'gray'
  }
});