import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform, Image, View, Text, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import Carousel from 'react-native-snap-carousel'
import { checkIos, wrongIos, checkAndroid, wrongAndroid, backAndroid, backIos } from '../Assets'
import { createList, createTrueFalseArray } from '../Utilities/helperFunctions'
import FlipFlashCard from './FlipFlashCard';
import FrontAnimation from './FrontAnimation';

//get screen sizes
const SLIDER_WIDTH = Dimensions.get('window').width;
const TOTAL_HEIGHT = Dimensions.get('window').height;

export default function SwipeCards() {
  // get data from navigation
  const navigation = useNavigation()
  const route = useRoute()
  const { deckId, deckTitle } = route.params;

  // useEffect to force rerender when cardIndex or deck changes
  useEffect(() => {
  }, [currentCardIndex, deck])

  // get data from firebase
  useFirebaseConnect(`decks/${deckId}`)
  const cards = useSelector(state => createList(state.firebase.data.decks[deckId].cards))
  const cardsTotal = cards.length

  // if the current deck is empty return a element to warn that
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

  // creat elements to handle the game flow
  // get the current showCard
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  // create the showing deck - with answered cards removed
  const [deck, setDeck] = useState(cards)
  // get all the right counts
  const [rightCounts, setRightCounts] = useState(0)
  // create a array with to manage the showbuttons
  const [showButtons, setShowButtons] = useState(createTrueFalseArray(deck))
  // control to show the right wrong animation
  const [showAnimation, setShowAnimation] = useState(false)
  const [rightAnswer, setRightAnswer] = useState(false)

  // function that is passed as a prop to flipFlashCard - to control the show buttons
  function updateShowButtons(show) {
    let newArray = [...showButtons];
    newArray[currentCardIndex] = show
    setShowButtons(newArray)
  }

  // function to play sound when answe is right or wrong
  playSound = async (right) => {
    try {
      if (right) {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
          require('../Assets/Sounds/Right-bell.mp3'),
          { shouldPlay: true }
        );
      } else {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
          require('../Assets/Sounds/Wrong-buzzer.mp3'),
          { shouldPlay: true }
        );
      }

    } catch (error) {
      console.log(error)
    }
  }

  // after a card is answered - right or wrong - that card is removed
  let removeCardFromDeck = (right) => {
    setRightAnswer(right)
    setShowAnimation(true)
    playSound(right)
    const cardToRemove = deck[currentCardIndex].id
    setDeck(deck.filter(card => card.id !== cardToRemove))
    setShowButtons(createTrueFalseArray(deck))
    // if right - increment rightCounts
    if (right) {
      setRightCounts(rightCounts + 1)
    }
    // return to first card
    this.swiper.snapToItem(0, animated = true, fireCallback = true);
    setCurrentCardIndex(0)
    //after a second - the animation is hided 
    setTimeout(() => {
      setShowAnimation(false)
    }, 1000);

  }

  // the element to render in the deck swiper - it´s a FlipFlashCard wrapped in a View
  const RenderCard = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <FlipFlashCard
          flip={showButtons[index]}
          question={item.question}
          answer={item.answer}
          answerImage={item.answerImage}
          questionImage={item.questionImage}
          updateShowButtons={updateShowButtons} />
      </View>
    );
  }

  // when deck length equals zero = navigate to score
  if (deck.length === 0) {
    // reset the game elements - case the user return
    setDeck(cards)
    setRightCounts(0)
    setCurrentCardIndex(0)
    // after a second - wait for the animation - go to score - send as data / the total cards / rightCounts
    // alse send decKId and deckTitle - in case the user choose to try again
    setTimeout(() => {
      navigation.navigate('Score', {
        cardsTotal: cardsTotal,
        rightCounts: rightCounts,
        deckId: deckId,
        deckTitle: deckTitle
      })
    }, 1000);

  }


  return (
    <View style={styles.container}>
      {showAnimation && <FrontAnimation type={rightAnswer ? 'thumbsUp' : 'thumbsDown'} />}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Platform.OS === 'ios' ? backIos : backAndroid}
            resizeMode={'contain'}
            style={Platform.OS === 'ios' ? styles.backIconIOS : styles.icon} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.title}>{deckTitle}</Text>
          <Text style={styles.messages} note>{deck.length} Questions Left</Text>
        </View>
      </View>
      <View style={styles.main}>
        <Carousel
          ref={swiper => {
            this.swiper = swiper
          }}
          data={deck}
          containerCustomStyle={{ flex: 1 }}
          slideStyle={{ flex: 1 }}
          renderItem={RenderCard}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={SLIDER_WIDTH}
          slideStyle={{ width: SLIDER_WIDTH }}
          layout='tinder'
          onScrollIndexChanged={(index) => setCurrentCardIndex(index)}
        />
      </View>
      <View style={styles.footer}>
        {showButtons[currentCardIndex] &&
          <View style={styles.answerView}>
            <Text style={styles.messages}>Did you get it Right?</Text>
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
    position: 'absolute',
    width: SLIDER_WIDTH,
    height: 40,
    top: 10,
    zIndex: -1,
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
    zIndex: 10,
    height: 45,
    width: 45,
    margin: 10,
    marginStart: 0
  },
  icon: {
    zIndex: 10,
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
    alignItems: 'center',
    textAlignVertical: "center",
    justifyContent: 'flex-start',
    textAlign: 'center',
    fontSize: 20
  },
  messages: {
    fontWeight: '400',
    fontSize: 14,
    color: 'gray'
  },
  main: {
    marginTop: 60,
    marginBottom: 160,
    height: TOTAL_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    padding: 25,
    width: SLIDER_WIDTH,
    height: TOTAL_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    ...Platform.select({
      android: {
        paddingTop: 20,
      }
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    bottom: 0,
    height: 100,
    zIndex: 5,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerView: {
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 20
  },
  buttonContainer: {
    paddingHorizontal: 30,
    ...Platform.select({
      ios: {
        marginTop: 10
      }
    }),
    width: SLIDER_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noMoreCardText:{
    fontSize: 24
  }

});