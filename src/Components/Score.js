import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { displayScoreMessage } from '../Utilities/helperFunctions'
import { useNavigation } from '@react-navigation/native';

export default Score = (props) => {
  const navigation = useNavigation()
  //const {totalCards, rights, deckId } = props
  const totalCards = 15
  const rights = 10

  const navigateToDeckList = () => {
    navigation.navigate('DeckList')
  }

  const tryAgain = () => (
    navigation.navigate('SwipeCards', {
      deckId: deckId,
      deckTitle: deck.title
    })
  )



  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Text style={styles.title}>Score</Text>
        <AnimatedCircularProgress
          size={280}
          width={30}
          fill={(rights / totalCards) * 100}
          tintColor="green"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#FE474C"
          arcSweepAngle={240}
          rotation={240}
          lineCap="round"
          duration={1500} />
        <View style={styles.scoreView}>
          <Text style={styles.text}>Total Cards</Text>
          <Text style={styles.title}>{totalCards}</Text>
          <Text style={styles.text}>Correct Answers</Text>
          <Text style={styles.title}>{rights}</Text>
        </View>
        <Text style={styles.text}>{displayScoreMessage((rights / totalCards) * 100)}</Text>
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
