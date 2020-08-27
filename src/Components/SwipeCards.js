import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import { StyleSheet, Platform, Image, View, Text, Dimensions } from 'react-native'
import { createList, createTrueFalseArray } from '../Utilities/helperFunctions'
import FlipFlashCard from './FlipFlashCard';
import { Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { checkIos, wrongIos, checkAndroid, wrongAndroid, backAndroid, backIos } from '../Assets'
import { useNavigation, useRoute } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel'
import FrontAnimation from './FrontAnimation';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const TOTAL_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = Math.round(TOTAL_HEIGHT * 4 / 5);
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

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
  const [showButtons, setShowButtons] = useState(createTrueFalseArray(deck))
  const [showIcon, setShowIcon] = useState(false)
  const [rightAnswer, setRightAnswer] = useState(false)

  function updateShowButtons(show) {
    let newArray = [...showButtons];
    newArray[currentCardIndex] = show
    setShowButtons(newArray)
  }

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

  let removeCardFromDeck = (right) => {
    setRightAnswer(right)
    setShowIcon(true)
    playSound(right)
    const cardToRemove = deck[currentCardIndex].id
    setDeck(deck.filter(card => card.id !== cardToRemove))
    setShowButtons(createTrueFalseArray(deck))
    if (right) {
      setRightCounts(rightCounts + 1)
    }
    this.swiper.snapToItem(0, animated = true, fireCallback = true);
    setCurrentCardIndex(0)
    setTimeout(() => {
      setShowIcon(false)
    }, 800);

  }
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

  if (deck.length === 0) {
    setDeck(cards)
    setRightCounts(0)
    setCurrentCardIndex(0)
    setTimeout(() => {
      navigation.navigate('Score', {
        cardsTotal: cardsTotal,
        rightCounts: rightCounts,
        deckId: deckId,
        deckTitle: deckTitle
      })
    }, 800);

  }


  return (
    <View style={styles.container}>
      {showIcon && <FrontAnimation type={rightAnswer? 'thumbsUp' : 'thumbsDown'} />}
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
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          slideStyle={{ width: viewportWidth }}
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
    top:10,
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

});