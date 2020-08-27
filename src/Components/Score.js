import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { displayScoreMessage } from '../Utilities/helperFunctions'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import FrontAnimation from './FrontAnimation';

export default Score = () => {
  // get data from navigation
  const navigation = useNavigation()
  const route = useRoute()
  const {cardsTotal, rightCounts, deckId, deckTitle } = route.params;
  const [showIcon, setShowIcon] = useState(false)

  // calculate the score
  const score = (rightCounts / cardsTotal) * 100

  // function to return to decklist
  const navigateToDeckList = () => {
    navigation.navigate('DeckList')
  }

  // function to restart the deck - send as data deckId and deckTitle - as when navigate from deckDetail
  const tryAgain = () => (
    navigation.navigate('SwipeCards', {
      deckId: deckId,
      deckTitle: deckTitle
    })
  )

  // playsounds if there´s a final animated element
  playSound = async (score) => {
    try {
      if (score === 0) {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
          require('../Assets/Sounds/Ticking-bomb.mp3'),
          { shouldPlay: true }
        );
      } else if (score === 100) {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
          require('../Assets/Sounds/Magical-explosion.mp3'),
          { shouldPlay: true }
        );
      }

    } catch (error) {
      console.log(error)
    }
  }

  // check if the score is on a extreme - if 0 or 100 - show an animation
  const completeAnimation = () => {
    if (score === 0 || score === 100){
      setShowIcon(true)
      playSound(score)
    }
    setTimeout(() => {
      setShowIcon(false)
    }, 5000);
  }


  return (
    <Container style={styles.container}>
      {showIcon && <FrontAnimation type={score === 0 ? 'bomb' : score === 100? 'fireworks': ''} />}
      <Content contentContainerStyle={styles.content}>
        <Text style={styles.title}>Score</Text>
        <AnimatedCircularProgress
          size={280}
          width={30}
          fill={score}
          tintColor="green"
          onAnimationComplete={() => completeAnimation()}
          backgroundColor="#FE474C"
          arcSweepAngle={240}
          rotation={240}
          lineCap="round"
          duration={1500} />
        <View style={styles.scoreView}>
          <Text style={styles.text}>Total Cards</Text>
          <Text style={styles.title}>{cardsTotal}</Text>
          <Text style={styles.text}>Correct Answers</Text>
          <Text style={styles.title}>{rightCounts}</Text>
        </View>
        <Text style={styles.text}>{displayScoreMessage(score)}</Text>
        <Button
          block
          style={styles.button}
          onPress={() => tryAgain()}>
          <Text style={styles.buttonText}>Try Again</Text>
        </Button>
        <Button
          block
          style={styles.button}
          onPress={() => navigateToDeckList()}>
          <Text style={styles.buttonText}>Return to DeckList</Text>
        </Button>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e6e6e6',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    alignItems: 'center',
    textAlignVertical: "center",
    justifyContent: 'flex-start',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20
  },
  text: {
    alignItems: 'center',
    textAlignVertical: "center",
    justifyContent: 'flex-start',
    textAlign: 'center',
    fontSize: 20,
    margin: 4,
    marginHorizontal: 20
  },
  scoreView: {
    alignItems: 'center',
    marginTop: -180,
    marginBottom: 30
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 14
  },
  button: {
    justifyContent: 'center',
    margin: 20
  },

})
