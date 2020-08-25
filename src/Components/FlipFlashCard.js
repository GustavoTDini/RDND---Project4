import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'native-base'
import { Audio } from 'expo-av';
import LoadedImage from './LoadedImage';
import FlipCard from 'react-native-flip-card'

export default function FlipFlashCard(props) {
  const { flip, question, answer, answerImage, questionImage, updateShowButtons } = props

  flipSound = async (show) => {
    console.log(show)
    try {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
        require('../Assets/Sounds/Card-flip.mp3'),
        { shouldPlay: true }
      );
    } catch (error) {
      console.log(error)
    }
    updateShowButtons(!show)
  }

  return (
    <View style={styles.container}>
      <FlipCard
        style={styles.cardcontainer}
        friction={6}
        perspective={800}
        flipHorizontal={true}
        flipVertical={false}
        flip={flip}
        clickable={true}
        useNativeDriver={true}
        alignHeight={true}
        onFlipStart={(isFlipStart) => flipSound(isFlipStart)}
      >
        {/* Face Side */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.question}>Question?</Text>
            {question && <Text style={styles.text}>{question}</Text>}
            {questionImage ? <LoadedImage imageRef={questionImage} type='cardImage' /> : <View style={styles.cardimage} />}
            <Text style={styles.bottonText} note>Press to see Answer</Text>
          </View>
        </View>
        {/* Back Side */}
        <View style={[styles.card, styles.flipCardBack]}>
          <View style={styles.cardContent}>
            <Text style={styles.answer}>Answer</Text>
            {answer && <Text style={styles.text}>{answer}</Text>}
            {answerImage ? <LoadedImage imageRef={AnswerImage} type='cardImage' /> : <View style={styles.cardimage} />}
            <Text style={styles.bottonText} note>Press to return to Question</Text>
          </View>
        </View>
      </FlipCard>

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



