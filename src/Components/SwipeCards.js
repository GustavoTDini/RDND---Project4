import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import { StyleSheet, Platform, Image, View, Text } from 'react-native'
import { createList, createTrueFalseArray } from '../Utilities/helperFunctions'
import FlipCard from './FlipCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { checkIos, wrongIos, checkAndroid, wrongAndroid, backAndroid, backIos } from '../Assets'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SwipeCards() {
  const navigation = useNavigation()
  const route = useRoute()
  const { deckId, deckTitle } = route.params;
  const [currentCard, setCurrentCard] = useState(0)
  const [rightCounts, setRightCounts] = useState(0)

  useFirebaseConnect(`decks/${deckId}`)
  let cards = useSelector(state => createList(state.firebase.data.decks[deckId].cards))
  const cardsTotal = cards.length

  const [showButtons, setShowButtons] = useState(createTrueFalseArray(cardsTotal))
  console.log(showButtons)

  useEffect(() => {
  }, [deck])
  const [deck, setDeck] = useState(cards)

  let removeCardFromDeck = (index, right) => {
    let cardId = deck[index].id
    setDeck(deck.filter(card => card.id !== cardId))
    if (right) {
      this.swiper.swipeRight();
      setRightCounts(rightCounts + 1)
    } else {
      this.swiper.swipeLeft();
    }
  }

  const showAnswer = (show, index) => {
    showButtons[index] = show
    setShowButtons(showButtons)
    console.log(showButtons)
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
        <Text style={styles.title}>{deckTitle}</Text>
      </View>
      <CardStack
        style={styles.main}
        ref={swiper => {
          this.swiper = swiper
        }}
        renderNoMoreCards={() => deck.length === 0 ? <Text style={styles.noMoreCardText}>No more cards :(</Text> : null}
        loop={true}
        secondCardZoom={deck.length === 1 ? 0 : 0.95}
        verticalSwipe={deck.length === 1 ? false : true}
        horizontalSwipe={deck.length === 1 ? false : true}
        onSwiped={(index) => setCurrentCard(index + 1 === deck.length ? 0 : index + 1)}>
        {deck.map((card, index) => (
          <View key={card.id}>
            <Card
              style={styles.card}>
              <FlipCard
                index = {index}
                question={card.question}
                answer={card.answer}
                answerImage={card.answerImage}
                questionImage={card.questionImage}
                showAnswer={showAnswer} />
            </Card>
          </View>
        ))}
      </CardStack>
      <View style={styles.footer}>
        {showButtons[currentCard] ?
          <View style={styles.answerView}>
            <Text>Did you get it Right?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  removeCardFromDeck(currentCard, false);
                }}>
                <Image
                  source={Platform.OS === 'ios' ? wrongIos : wrongAndroid}
                  resizeMode={'contain'}
                  style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  removeCardFromDeck(currentCard, true);
                }}>
                <Image
                  source={Platform.OS === 'ios' ? checkIos : checkAndroid}
                  resizeMode={'contain'}
                  style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
          : null
        }
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
  backIconIOS:{
    height: 50,
    width: 50,
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
  noMoreCardText:{ 
    fontWeight: '700', 
    fontSize: 18, 
    color: 'gray' 
  }
});