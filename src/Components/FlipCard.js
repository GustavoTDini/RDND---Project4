import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'native-base'
import { TouchableHighlight } from 'react-native-gesture-handler';
import CardFlip from 'react-native-card-flip';
import { Audio } from 'expo-av';
import LoadedImage from './LoadedImage'

export default function FlipCard(props) {
  const cardRef = useRef(props.cardId);
  const [front, setFrontBack] = useState(true)

  useEffect(() => {
    props.showAnswer(!front)
  }, [front])


  flipSound = async (ref, show) => {
    try {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
        require('../Assets/Sounds/Card-flip.mp3'),
        { shouldPlay: true }
      );
    } catch (error) {
      console.log(error)
    }
    ref.current.flip()
    setFrontBack(!show)
  }

  return (
    <View style={styles.container}>
      <CardFlip style={styles.cardcontainer} ref={cardRef} >
        <TouchableHighlight
          activeOpacity={0.4}
          underlayColor="#ff0000"
          style={styles.card}
          onLongPress={() => flipSound(cardRef, true)} >
          <View style={styles.cardContent}>
            <Text style={styles.question}>Question?</Text>
            {props.question && <Text style={styles.text}>{props.question}</Text>}
            {props.questionImage ? <LoadedImage imageRef={props.questionImage} type='cardImage' /> : <View style={styles.cardimage} />}
            <Text style={styles.bottonText} note>Press to see Answer</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.4}
          underlayColor="#00ff00"
          style={[styles.card, styles.flipCardBack]}
          onLongPress={() => flipSound(cardRef, false)}>
          <View style={styles.cardContent}>
            <Text style={styles.answer}>Answer</Text>
            {props.answer && <Text style={styles.text}>{props.answer}</Text>}
            {props.answerImage ? <LoadedImage imageRef={props.AnswerImage} type='cardImage' /> : <View style={styles.cardimage} />}
            <Text style={styles.bottonText} note>Press to return to Question</Text>
          </View>
        </TouchableHighlight>
      </CardFlip>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardcontainer: {
    width: 320,
    height: 470,
  },
  card: {
    width: 320,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 4,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
  },
  flipCardBack: {
    backgroundColor: 'green'
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  answer: {
    flex: 1,
    fontSize: 24,
    marginTop: 4,
    color: 'green'
  },
  question: {
    flex: 1,
    fontSize: 24,
    marginTop: 4,
    color: '#FE474C',
  },
  text: {
    flex: 2,
    fontSize: 16,
  },
  cardimage: {
    flex: 4
  },
  bottonText: {
    flex: 1,
    fontSize: 12,
    marginTop: 20,
  }
});



