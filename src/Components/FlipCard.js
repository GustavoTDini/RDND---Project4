import React, { useRef } from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import CardFlip from 'react-native-card-flip';

export default function FlipCard(props) {
  const cardRef = useRef(props.id);

  return (
    <CardFlip style={styles.container} ref={cardRef} >
      <TouchableHighlight activeOpacity={0.4} underlayColor="#ff0000" style={styles.flipCard} onLongPress={() => cardRef.current.flip()} ><Text>{props.question}</Text></TouchableHighlight>
      <TouchableHighlight activeOpacity={0.4} underlayColor="#00ff00" style={styles.flipCardBack} onLongPress={() => cardRef.current.flip()} ><Text>{props.answer}</Text></TouchableHighlight>
    </CardFlip>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 10,
    width: 400,
    height: 500,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: 400,
    height: 500,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  flipCardBack: {
    width: 400,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  }
});



