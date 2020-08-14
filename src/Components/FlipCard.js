import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import CardFlip from 'react-native-card-flip';
import { Audio } from 'expo-av';
import BackgroundImage from './BackgroundImage';

export default function FlipCard(props) {
  const cardRef = useRef(props.id);
  const [showButtons, setShowButtons] = useState(false)

  flipSound = async (ref, show) => {
    setShowButtons(show)
    try {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
        require('../Assets/Sounds/Card-flip-sound-effect.mp3'),
        { shouldPlay: true }
      );
    } catch (error) {
      console.log(error)
    }
    ref.current.flip()
    
    props.showAnswer(showButtons)
  }

  return (
    <View style={styles.container}>
      <CardFlip style={styles.Cardcontainer} ref={cardRef} >
        <TouchableHighlight
          activeOpacity={0.4}
          underlayColor="#ff0000"
          style={styles.card}
          onLongPress={() => flipSound(cardRef, true)} >
          <View style={styles.cardContent}>
            {props.question && <Text>{props.question}</Text>}
            {props.questionImage && <BackgroundImage imageRef={props.questionImage} />}
            <Text>Press to see Answer</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.4}
          underlayColor="#00ff00"
          style={[styles.card, styles.flipCardBack]}
          onLongPress={() => flipSound(cardRef, false)}>
          <View style={styles.cardContent}>
            {props.answer && <Text>{props.answer}</Text>}
            {props.AnswerImage && <BackgroundImage imageRef={props.AnswerImage} />}
            <Text>Press to return to Question</Text>
          </View>
        </TouchableHighlight>
      </CardFlip>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Cardcontainer: {
    width: 320,
    height: 470,
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
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  flipCardBack: {
    backgroundColor: 'green'
  },
  cardContent:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin:10,
    backgroundColor: 'white',
    borderRadius: 3,
  },
});



